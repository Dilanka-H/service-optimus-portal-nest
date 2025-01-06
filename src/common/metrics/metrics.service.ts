import { Injectable } from '@nestjs/common';
import { Counter, Summary, Registry } from 'prom-client';

@Injectable()
export class MetricsService {
  private register: Registry;
  private inboundRequests: Counter<string>;
  private inboundRequestDuration: Summary<string>;
  private inboundRequestTime: Counter<string>;
  private inboundRequestTimeDuration: Summary<string>;

  constructor() {
    this.register = new Registry();

    // Counter for inbound requests
    this.inboundRequests = new Counter({
      name: 'optimus_be_inbound_counter',
      help: 'Total number of http requests',
      labelNames: ['node', 'url', 'method', 'action', 'result', 'Result_Code', 'Result_Desc'],
      registers: [this.register],
    });

    // Summary for request durations
    this.inboundRequestDuration = new Summary({
      name: 'optimus_be_inbound_summary',
      help: 'Duration of http requests',
      labelNames: ['node', 'url', 'method', 'action', 'result', 'Result_Code', 'Result_Desc'],
      aggregator: 'average',
      registers: [this.register],
    });

    // Counter for request time
    this.inboundRequestTime = new Counter({
      name: 'optimus_be_inbound_request_time_counter',
      help: 'Total number of http requests including duration',
      labelNames: ['node', 'url', 'method', 'action', 'result', 'Result_Code', 'Result_Desc', 'duration'],
      registers: [this.register],
    });

    //Summary for request time
    this.inboundRequestTimeDuration = new Summary({
      name: 'optimus_be_inbound_request_time_summary',
      help: 'Duration of http requests',
      labelNames: ['node', 'url', 'method', 'action', 'result', 'Result_Code', 'Result_Desc', 'duration'],
      aggregator: 'average',
      registers: [this.register],
    });
  }

  // Increment inbound requests counter
  incrementInboundRequests(labels: Record<string, string>) {
    this.inboundRequests.labels(labels).inc();
  }

  // Observe request duration
  observeRequestDuration(labels: Record<string, string>, duration: number) {
    this.inboundRequestDuration.labels(labels).observe(duration);
  }

  // Increment request time counter
  incrementInboundRequestTime(labels: Record<string, string>) {
    this.inboundRequestTime.labels(labels).inc()
  }

  // Observe inbound request time duration
  observeInboundRequestTimeDuration(labels: Record<string, string>, duration: number) {
    this.inboundRequestTimeDuration.labels(labels).observe(duration);
  }

  // Expose all metrics for Prometheus
  getMetrics(): Promise<string> {
    return this.register.metrics();
  }
}
