'use client'

import { useState } from 'react'
import { YStack, XStack, Input, Button, Paragraph, ScrollView, Card, Spinner } from 'tamagui'

export function ChatScreen() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hey there 👋, how can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message immediately
    const userMsg = { from: 'user', text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      // 🔥 Actual API call
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()

      // Append bot message from API response
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: data.result || 'No response received.' },
      ])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [...prev, { from: 'bot', text: '⚠️ Failed to connect to server.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <YStack flex={1} p="$4" space="$4" height="100vh" justifyContent="space-between">
      {/* Chat messages */}
      <ScrollView flex={1}>
        <YStack space="$3">
          {messages.map((msg, i) => (
            <XStack key={i} justifyContent={msg.from === 'user' ? 'flex-end' : 'flex-start'}>
              <Card
                p="$3"
                borderRadius="$3"
                backgroundColor={msg.from === 'user' ? 'seagreen' : 'lightgray'}
                maxWidth="70%"
              >
                <Paragraph color={msg.from === 'user' ? 'white' : 'black'}>{msg.text}</Paragraph>
              </Card>
            </XStack>
          ))}
          {loading && (
            <XStack justifyContent="flex-start">
              <Card p="$3" borderRadius="$3" backgroundColor="lightgray">
                <Spinner size="small" color="black" />
              </Card>
            </XStack>
          )}
        </YStack>
      </ScrollView>

      {/* Input bar */}
      <XStack alignItems="center" space="$2" mb="$5">
        <Input
          flex={1}
          value={input}
          placeholder="Type a message..."
          onChangeText={setInput}
          onSubmitEditing={handleSend}
        />
        <Button onPress={handleSend} color="white" backgroundColor="seagreen" disabled={loading}>
          {loading ? '...' : 'Send'}
        </Button>
      </XStack>
    </YStack>
  )
}
