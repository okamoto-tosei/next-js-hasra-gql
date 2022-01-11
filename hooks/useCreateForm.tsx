import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries/queries'
import { CreateUserMutation } from '../types/generated/graphql'

// custom hooks
export const useCreateForm = () => {
  const [text, setText] = useState('')
  const [userName, setUserName] = useState('')

  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    update(cache, { data: { insert_users_one } }) {
      const cacheId = cache.identify(insert_users_one)
      cache.modify({
        fields: {
          users(existingUsers, { toReference }) {
            return [toReference(cacheId), ...existingUsers]
          },
        },
      })
    },
  })

  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value)
    },
    []
  )

  const userNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }, [])

  const printMessage = useCallback(() => {
    console.log('hello')
  }, [])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
        await insert_users_one({
          variables: {
            name: userName,
          },
        })
      } catch (error) {
        alert(error.message)
      }
      setUserName('')
    },
    [userName]
  )

  return {
    text,
    handleSubmit,
    userName,
    userNameChange,
    printMessage,
    handleTextChange,
  }
}
