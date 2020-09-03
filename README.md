# github-client
今後のReactでの開発はこんな設計でやったら丁度いいんじゃないかと思って試しているリポジトリ。  
Apolloを使いたかったのでGitHub APIを使っているが、UIはまともに作ってない。  

## 方針
Reduxを使っていた頃はあるページにおけるリモート/ローカルステートを全てまとめていたが、  
今後は一つのでかいステートを作らず、意味のあるコンポーネントの単位ごとに分けてステートはそのなかに隠蔽するのがいいんじゃないかと思っている。    
Atomic Designでいうオーガニズム相当のものだと考えるとイメージしやすいかもしれない?  
今回であれば次のように分けている
1. 検索フォーム
2. リポジトリ一覧

検索フォームはローカルステートを持ちたいのでContext APIとカスタムhooksを使っている。  
リポジトリ一覧ではリモートステートが必要になるが、Apollo Clientに任せているので自分で定義するようなものはあまりない。  

## 悩みポイント その1
リポジトリ一覧はどうしても検索フォームの入力内容に依存することになるのだが、この情報の受け渡しかたをどうしようか悩んでいる。  
できれば検索フォームのContextが公開しているものをリポジトリ一覧が直接触るのは避けたい。  

最初に考えていた流れは次のような感じ
1. フォームの情報をRepositoryListコンポーネントのPropsとして渡す。  
2. TopPageコンポーネント(src/pages/index.tsx)に情報の受け渡し役になってもらう
3. 受け渡しができるように検索フォームのProviderをTopPageに置く

こうやって試している途中、3.で破綻することに気づいてしまった。  
TopPage内でやりとりするにはProviderをTopPageのさらに外側に置かなければいけなかった。  
_appにProviderを追加すればいいだけなんだが、各ページに関係するものを_appに置くのが気持ち悪いので嫌だった。ページに関係するものはそのページ内に閉じていてほしい。

そうなるとProviderはTopPageに置きつつ、データ受け渡し用のコンポーネントを別に用意することを考えた。  
しかし、これも直観に反するような気がする。ようは次のような感じ。  

```typescript jsx
export default function TopPage(): JSX.Element {
  return (
    <SearchProvider>
      <データ受け渡し君 />
    </SearchProvider>
  )
}

export function データ受け渡し君(): JSX.Element {
  const [searchState] = useSearchState()
  return (
     <>
       <Header />
       <RepositoryList userName={searchState.userName}/>
     </>
   )
}
```

現状では色々とあきらめて、Containerではあれこれに依存してもいいということにしてしまっている。　　
微妙な感じもするが、データ受け渡し君を作るほうがまだマシかな?  

## 悩みポイント その2
検索フォームの内容が増えてきたときの型のやり取りも悩んでいる。  
つまり、そのうちsearch-context.tsx内の `State` をリポジトリ一覧でも参照したくなるんじゃないかということ。  
これをやっちゃうと最初に掲げていた話を破ることになってしまう。
> できれば検索フォームのContextが公開しているものをリポジトリ一覧が直接触るのは避けたい。
  
少し面倒くさいけど、検索情報に関する型は検索フォームとリポジトリ一覧の両方で似たようなものを定義する方向でも良いかなと個人的には考えている。

## 2020/09/03 追記
コンポーネントやステートを意味のある単位に分けるという考え方は悪くなさそうだが、検索フォームのステートに関する粒度を間違えている気がしてきた。    
検索の条件はどうしてもその画面全体に影響があるものなので、粒度としても画面全体としてとらえたほうが良さそう。    
検索フォームとレポジトリ一覧を同じ粒度のものとして扱おうとしたのが失敗の原因。  
そもそもこれらは粒度が違うものだと考えればつじつま合わせがしやすそう。