import { ChatScreen } from 'app/features/chat/chat-screen'
import { Stack } from 'expo-router'
import { useParams } from 'solito/navigation'

export default function Screen() {
  const { id } = useParams()
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Chat',
          presentation: 'modal',
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <ChatScreen id={id as string} />
    </>
  )
}
