# Why Khizab

## The Problems

Developing applications for the Aptos involves solving several complex problems. Developers must support wallet connections, account management, transaction handling, and real-time data updates. Maintaining consistent application state across these components is critical, but often difficult to manage.

The current tooling available is not well-integrated and lacks a cohesive structure. This results in developers needing to stitch together multiple solutions, each of which may break as new versions or alternatives emerge. As a result, more time is spent on managing these integrations and handling state updates than on building core application functionality. App developers should not need to worry about connecting tens of different wallets or calling a misspelled contract function, or accidentally spamming the network.

Khizab solves these challenges by offering a complete, integrated approach to building Aptos applications. It abstracts away the complexity of managing state and wallet interactions, allowing developers to focus on the business logic of their applications without needing to worry about the boilerplate details.

## Developer Experience

A key design principle of Khizab is improving the developer experience. Khizab achieves this through a modular architecture that promotes flexibility and ease of use. Each component is designed to be composable, allowing developers to easily integrate or replace functionality as needed. This modular approach also enables a clear separation of concerns, making the codebase more maintainable and adaptable to future changes.
Khizab delivers a great developer experience through modular and composable APIs, automatic type safety and inference, and comprehensive documentation.

Khizab also provides [strongly typed APIs](/react/typescript), allowing consumers to get the best possible experience through autocomplete, type inference, as well as static validation. You often just need to provide an ABI and Khizab can help you autocomplete your way to success, identify type errors before your users do, drill into blockchain errors [at compile and runtimes](/react/guides/error-handling) with surgical precision, and much more.

Comprehensive documentation accompanies every module in Khizab, providing developers with clear guidance on how to use each feature. The library’s focus on a well-documented and intuitive API helps reduce the learning curve and accelerates development, making it easier to implement and maintain Aptos applications.


## Performance

Performance is a critical factor in any application, and Khizab is optimized to ensure efficient execution. The library is designed to minimize bundle size, with support for tree-shaking and dead-code elimination. This ensures that only the necessary parts of the library are included in the final build, leading to faster load times and improved performance.

In addition to reducing the overall application size, Khizab optimizes data handling by providing built-in support for caching, deduplication, and persistence, and much more through [TanStack Query](/react/guides/tanstack-query). This minimizes the number of redundant requests made to the blockchain, reducing the cost of api calls and improving the responsiveness of the application.

## Feature Coverage

Khizab supports the most popular and commonly-used Aptos Sdk features out of the box with 20+ React Hooks for accounts, wallets, contracts, transactions,  and more. Khizab also supports just about any wallet out there through it's official [connectors](/react/api/connectors), and [extensable API](/dev/creating-connectors).

If you need lower-level control, you can always drop down to [Khizab Core](/core/getting-started) or [Aptos Sdk](https://github.com/aptos-labs/aptos-ts-sdk), which Khizab uses internally to perform blockchain operations.

## Stability

Stability is a core focus of Khizab. The library is rigorously tested across multiple environments and is built with long-term stability in mind. Each release follows semantic versioning (semver), allowing developers to confidently upgrade between versions without fear of introducing breaking changes.

With Khizab, new functionality will be opt-in with old functionality being deprecated alongside the new features. This means upgrading to the latest major versions will not require immediate changes.

Khizab is actively [maintained](https://github.com/khizab/khizab), with a commitment to keeping the library up-to-date with changes in the Aptos ecosystem. This guarantees that developers using the library can rely on it as a stable foundation for building and scaling their applications.
