import React, { VFC } from 'react'
import { useCreateForm } from '../hooks/useCreateForm'
import { Child } from './Child'

export const CreateUser: VFC = () => {
  // custom hooks import
  const {
    text,
    handleSubmit,
    userName,
    userNameChange,
    printMessage,
    handleTextChange,
  } = useCreateForm()

  return (
    <>
      {console.log('CreateUser render')}
      <p className="mb-3 font-bold">Custom Hook + useCallback + memo</p>
      <div className="mb-3 flex flex-cols justify-center items-center">
        <label>Text</label>
        <input
          type="text"
          className="px-3 py-2 border border-gray-300"
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label>UserName</label>
        <input
          type="text"
          className="MB-3 PX-3 PY-2 border border-gray-300"
          placeholder="New User?"
          value={userName}
          onChange={userNameChange}
        />
        <button
          className="my-3 px-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          type="submit"
        >
          Submit
        </button>
      </form>
      <Child printMessage={printMessage} handleSubmit={handleSubmit} />
    </>
  )
}
