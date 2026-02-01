
## Step 1: Install Dependencies

```sh
# Using npm
npm install

# OR using Yarn
yarn
```

## Step 2: Start Development Server

```sh
# Using npm
npm run android:dev

# OR using Yarn
yarn android:dev
```

If I had more time

- If there are a large number of doctors on the homepage, the `<ScrollView>` component should be replaced with a `<FlatList>` component, and paging loading should be implemented
 The `<FlatList>` component has been implemented on my appointment page
- Implement login and registration, as well as user switching
- Enrich unit testing
- Add the function of switching time zones
- Implement calendar view selection and appointment
- Confirmation, reminder, and change notification for user reservations
- Unified API management
- Offline caching