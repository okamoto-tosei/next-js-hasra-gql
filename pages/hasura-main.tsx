import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchMain: VFC = () => {
  const { data, error, loading } = useQuery<GetUsersQuery>(GET_USERS, {
    // データの取得後に、cacheを生成しない、そのため@clientでキャッシュを読み込むqueryの場合データを取得できない（cacheがつくられないから）
    // fetchPolicy: 'no-cache',

    // 一度取得したデータがキャッシュにある場合、キャッシュの方を見に行く
    // fetchPolicy: 'cache-first',

    // 動作はnetwork-onlyと同じだが、一点違いがありnetwork-onlyは全権データが取得後表示するため通信中は何も表示しないが、
    // cache-and-networkはデータの通信中に既存のキャッシュにあるデータを通信中の時は表示してくれる、通信完了後新しいデータが取得されるので
    // 新しいデータに置き換えてくれる。
    fetchPolicy: 'cache-and-network',
    // useQueryが実行されるたび毎回DBの最新のデータを取りに行く、データ取得後にcacheに格納する
    // fetchPolicy: 'network-only',
  })
  console.log(data, error, loading)

  if (error)
    return (
      <Layout title="Hasura FetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    )

  return (
    <Layout title="Hasura FetchPolicy">
      <p>Hasura Main page</p>
      {data?.users?.map((edges) => {
        return (
          <p className="my-1" key={edges.id}>
            {edges.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  )
}

export default FetchMain
