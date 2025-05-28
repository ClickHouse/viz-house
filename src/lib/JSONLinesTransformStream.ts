export class JSONLinesTransformStream {
  private bufferedString: string;
  private decoder: TextDecoder;
  private transformStream: TransformStream<Uint8Array, unknown>;

  constructor() {
    this.bufferedString = '';
    this.decoder = new TextDecoder('utf-8');
    this.transformStream = new TransformStream({
      transform: (chunk, controller) => this._transform(chunk, controller),
      flush: (controller) => this._flush(controller)
    });
  }

  private _transform(
    chunk: Uint8Array,
    controller: TransformStreamDefaultController<unknown>
  ): void {
    this.bufferedString += this.decoder.decode(chunk, { stream: true });
    const lines = this.bufferedString.split(/\r?\n/);

    // Process all lines except the last one (it might be incomplete)
    for (let i = 0; i < lines.length - 1; i++) {
      if (lines[i].trim()) {
        try {
          const jsonObject = JSON.parse(lines[i]);
          controller.enqueue(jsonObject); // Push the JSON object to the readable side
        } catch (error) {
          controller.error(
            new Error('Failed to parse JSON: ' + (error as Error).message)
          );
        }
      }
    }

    // Keep the last line (it might be incomplete)
    this.bufferedString = lines[lines.length - 1];
  }

  private _flush(controller: TransformStreamDefaultController<unknown>): void {
    // Process any remaining buffered string
    if (this.bufferedString.trim()) {
      try {
        const jsonObject = JSON.parse(this.bufferedString);
        controller.enqueue(jsonObject); // Push the JSON object to the readable side
      } catch (error) {
        controller.error(new Error('Failed to parse JSON: ' + (error as Error).message));
      }
    }
  }

  get readable(): ReadableStream<unknown> {
    return this.transformStream.readable;
  }

  get writable(): WritableStream<Uint8Array> {
    return this.transformStream.writable;
  }
}

export async function* streamToAsyncIterator(stream: ReadableStream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
