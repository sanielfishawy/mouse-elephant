taskset -c 2 iperf3 -s -p 5201 -D
taskset -c 2 iperf3 -s -p 5202 -D
taskset -c 2 iperf3 -s -p 5203 -D

taskset -c 1 iperf3 -c 10.0.1.45 -p 5201 -t 0 -P 10
taskset -c 1 iperf3 -c 10.0.1.45 -p 5202 -t 0 -P 10
taskset -c 1 iperf3 -c 10.0.1.45 -p 5203 -t 0 -P 10