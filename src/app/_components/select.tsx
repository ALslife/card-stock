import React from 'react'

const select = ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => {
  return (
    <div className="relative w-full select-wrap">
      <select className="relative w-full border border-solid border-[#BDBDBD] py-5 px-4 rounded-lg"
        value={value} // 親から受け取った値を設定
        onChange={onChange} // 親から受け取ったonChangeを設定
      >
        <option value="">ALL</option>
        <option value="PRB-01">プレミアムブースター ONE PIECE CARD THE BEST【PRB-01】</option>
        <option value="EB-02">エクストラブースター Anime 25th collection【EB-02】</option>
        <option value="EB-01">エクストラブースター メモリアルコレクション【EB-01】</option>
        <option value="OP-11">ブースターパック 神速の拳【OP-11】</option>
        <option value="OP-10">ブースターパック 王族の血統【OP-10】</option>
        <option value="OP-09">ブースターパック 新たなる皇帝【OP-09】</option>
        <option value="OP-08">ブースターパック 二つの伝説【OP-08】</option>
        <option value="OP-07">ブースターパック 500年後の未来【OP-07】</option>
        <option value="OP-06">ブースターパック 双璧の覇者【OP-06】</option>
        <option value="OP-05">ブースターパック 新時代の主役【OP-05】</option>
        <option value="OP-04">ブースターパック 謀略の王国【OP-04】</option>
        <option value="OP-03">ブースターパック 強大な敵【OP-03】</option>
        <option value="OP-02">ブースターパック 頂上決戦【OP-02】</option>
        <option value="OP-01">ブースターパック ROMANCE DAWN【OP-01】</option>
        <option value="ST-21">スタートデッキEX ギア5【ST-21】</option>
        <option value="ST-20">スタートデッキ 黄 シャーロット・カタクリ【ST-20】</option>
        <option value="ST-19">スタートデッキ 黒 スモーカー【ST-19】</option>
        <option value="ST-18">スタートデッキ 紫 モンキー・D・ルフィ【ST-18】</option>
        <option value="ST-17">スタートデッキ 青 ドンキホーテ・ドフラミンゴ【ST-17】</option>
        <option value="ST-16">スタートデッキ 緑 ウタ【ST-16】</option>
        <option value="ST-15">スタートデッキ 赤 エドワード・ニューゲート【ST-15】</option>
        <option value="ST-14">スタートデッキ 3D2Y【ST-14】</option>
        <option value="ST-13">アルティメットデッキ 3兄弟の絆【ST-13】</option>
        <option value="ST-12">スタートデッキ ゾロ&サンジ【ST-12】</option>
        <option value="ST-11">スタートデッキ Side ウタ【ST-11】</option>
        <option value="ST-10">アルティメットデッキ 三船長集結【ST-10】</option>
        <option value="ST-09">スタートデッキ Side ヤマト【ST-09】</option>
        <option value="ST-08">スタートデッキ Side モンキー・D・ルフィ【ST-08】</option>
        <option value="ST-07">スタートデッキ ビッグ・マム海賊団【ST-07】</option>
        <option value="ST-06">スタートデッキ 海軍【ST-06】</option>
        <option value="ST-05">スタートデッキ ONE PIECE FILM edition【ST-05】</option>
        <option value="ST-04">スタートデッキ 百獣海賊団【ST-04】</option>
        <option value="ST-03">スタートデッキ 王下七武海【ST-03】</option>
        <option value="ST-02">スタートデッキ 最悪の世代【ST-02】</option>
        <option value="ST-01">スタートデッキ 麦わらの一味【ST-01】</option>
        <option value="P">プロモーションカード</option>
        <option value="L">限定商品収録カード</option>
      </select>
    </div>
  )
}

export default select