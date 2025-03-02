import IconLoading from "#public/icon-loading.svg?react"
import "../style.css"

export const Loader = () => {
  return <div className={"loader"}>
    <div className={"loader__icon"}>
      <IconLoading />
    </div>
  </div>
}
