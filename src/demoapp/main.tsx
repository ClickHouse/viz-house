import React from 'react';
import ReactDOM from 'react-dom/client';
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { App, mockRequestUrl } from '@/demoapp/App';

const initializeMockServiceWorker = async () => {
  const worker = setupWorker(
    http.post(mockRequestUrl, () => {
      return new HttpResponse(
        new ReadableStream({
          start: (controller) => {
            const encoder = new TextEncoder();
            controller.enqueue(
              encoder.encode(
                [
                  {
                    event_time: '2020-01-01',
                    irrelevant_column: 'this is irrelevant because of chartConfig',
                    read_bytes: 30
                  },
                  {
                    event_time: '2020-01-02',
                    irrelevant_column: 'this is irrelevant because of chartConfig',
                    read_bytes: 42
                  },
                  {
                    event_time: '2020-01-03',
                    irrelevant_column: 'this is irrelevant because of chartConfig',
                    read_bytes: 89
                  },
                  {
                    event_time: '2020-01-04',
                    irrelevant_column: 'this is irrelevant because of chartConfig',
                    read_bytes: 26
                  },
                  {
                    event_time: '2020-01-05',
                    irrelevant_column: 'this is irrelevant because of chartConfig',
                    read_bytes: 12
                  },
                  {
                    event_time: '2020-01-06',
                    irrelevant_column: 'this is irrelevant because of chartConfig',
                    read_bytes: 88
                  },
                  {
                    event_time: '2020-01-07',
                    irrelevant_column: 'this is irrelevant because of chartConfig',
                    read_bytes: 78
                  },
                  {
                    event_time: '2020-01-08',
                    irrelevant_column: 'this is irrelevant because of chartConfig',
                    read_bytes: 75
                  },
                  {
                    event_time: '2020-01-09',
                    irrelevant_column: 'this is irrelevant because of chartConfig',
                    read_bytes: 89
                  },
                  {
                    event_time: '2020-01-10',
                    irrelevant_column: 'this is irrelevant because of chartConfig',
                    read_bytes: 92
                  },
                  {
                    event_time: '2020-01-11',
                    irrelevant_column: 'this is irrelevant because of chartConfig',
                    read_bytes: 94
                  },
                  {
                    event_time: '2020-01-12',
                    irrelevant_column: 'this is irrelevant because of chartConfig',
                    read_bytes: 56
                  }
                ]
                  .map((dataObject: unknown) => JSON.stringify(dataObject))
                  .join('\n')
              )
            );
            controller.close();
          }
        })
      );
    })
  );

  await worker.start();
};

initializeMockServiceWorker().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
