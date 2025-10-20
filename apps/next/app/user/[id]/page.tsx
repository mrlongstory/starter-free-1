'use client'

import { ChatScreen } from 'app/features/chat/chat-screen'
import { useParams } from 'solito/navigation'

export default function Page() {
  const { id } = useParams()
  return <ChatScreen id={id as string} />
}
