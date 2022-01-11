import { ChangeEvent, FormEvent, memo, VFC } from 'react'

type Props = {
  printMessage: () => void
  handleSubmit: (event: ChangeEvent<HTMLFormElement>) => Promise<void>
}

// eslint-disable-next-line react/display-name
export const Child: VFC<Props> = memo(({ printMessage }) => {
  return (
    <>
      {console.log('Child render')}
      <p>Child Component</p>
      <button
        className="my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
        onClick={printMessage}
      >
        click
      </button>
    </>
  )
})
