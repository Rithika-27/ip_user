import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="second" />
      <Stack.Screen name="login" />
      <Stack.Screen name="mainpage" />
      <Stack.Screen name="category" />
      <Stack.Screen name="mybooks" />
      <Stack.Screen name="fine/[bookTitle]" />
      <Stack.Screen name="wishlist" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="userdetails" />
      <Stack.Screen name="borrowingactivity" />
      <Stack.Screen name="renew/[bookTitle]" /> {/* Add this line */}
    </Stack>
  );
}
