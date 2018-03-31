# Mucking with CSP

## What is CSP?

> - CSP are a pattern for concurrent programming that involves two key abstractions:
> 
> -   Processes: are tasks that are, in general, executed concurrently. The code defining a Process is executed sequentially.
>     
> -   Channels: are first-in first-out (FIFO) queues that are used for communication between Processes. You put an element into a Channel via
> the operation  `put`  and take an element out of a channel via the
> operation  `take`.
> 
> From [Communicating Sequential Processes: an alternative to async generators](http://2ality.com/2017/03/csp-vs-async-generators.html)

## Where are these examples from?
These examples are from [Joe Harlow](https://github.com/f5io)'s video [Implementation of CSP](https://www.youtube.com/watch?v=drqJGaa_O-E)

## What libraries are used?
The libraries used are [@paybase/csp](https://github.com/paybase/csp), and [@paybase/pool](https://github.com/paybase/pool), though Joe does go through a rudimentary implementation of [@paybase/csp](https://github.com/paybase/csp) in the video
