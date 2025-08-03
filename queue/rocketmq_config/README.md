# RocketMQ Exporter

This deploys Prometheus exporter for RocketMQ.

## Metrics exposed

- Queue sizes
- Latency between brokers
- Topic message counts
- Broker status

## Prometheus Target

Add this to `prometheus.yml`:

```yaml
  - job_name: 'rocketmq-exporter'
    static_configs:
      - targets: ['rocketmq-exporter:5557']
