## NielsenIQ Frontend Challenge

#### Why I Used Axios Instead of Fetch

1.  **Simplicity and Readability**: Axios provides a cleaner and more concise syntax compared to the native Fetch API. For example, handling JSON data with Axios is straightforward, as it automatically transforms the data into JSON format, unlike Fetch, where you have to manually call `.json()` on the response.
    
2.  **Built-in Features**: Axios comes with many useful features out of the box, such as:
    
    -   **Interceptors**: Allow us to modify requests or responses before they are handled by then or catch.
    -   **Automatic Transformations**: It automatically transforms JSON data.
    -   **Timeouts**: Axios allows setting request timeouts easily.
    -   **Cancellation**: It provides a way to cancel requests using cancel tokens.
3.  **Error Handling**: Axios has better error handling capabilities. It automatically throws an error for HTTP status codes outside the range of 2xx, making it easier to handle specific errors.

#### Why I Created an Axios Instance

Creating an Axios instance allows us to configure default settings for all HTTP requests in one place. This includes:

-   **Base URL**: By setting the base URL, we ensure all requests use the same base, making the code cleaner and avoiding repetition. This for "future" scalability.
-   **Interceptors**: We can set up interceptors to handle specific actions for every request or response. In this case, the interceptors are used to set the `errorLoading` state in the context and in that way be able to handle when the api is down.

#### Why I Used `useCallback`

The `useCallback` hook is used to memoize the `fetchReq` function, which ensures that the function is not recreated on every render. This is important for performance optimization because:

-   **Stability**: It keeps the reference to the `fetchReq` function stable between renders.
-   **Dependency Management**: Since the function does not depend on any props or state variables, the dependency array is empty, meaning it will only be created once.

#### Why I Used `reduce` for Array Transformation

In the `app.jsx`, I used the `reduce` method to transform and update the photos array. The reason for using `reduce` is that Joshua (interviewer) suggested studying the implementation of various array methods using `reduce`.

#### SweetAlerts2 

I chose to use SweetAlerts2 for displaying information modals because it provides a straightforward way to create and customize modals in JavaScript applications. It offers a more modern and user-friendly alternative to the default browser alert and confirm dialogs. SweetAlerts2 allows for easy customization of modal dialogs, including animations, icons, and buttons, making it ideal for providing a polished user experience. 

#### Styled-Components 

I used Styled-Components for styling in this challenge because it aligns with the technology stack that Label Insights works with. Styled-Components allows us to write actual CSS to style components, scoped to the components themselves. This helps in encapsulating styles and preventing class name clashes.

### Thanks

Thank you once again for the opportunity to interview for the role. I am enthusiastic about the possibility of contributing to your team and utilizing my skills. I look forward to hearing from you again!

Miguel Ramos