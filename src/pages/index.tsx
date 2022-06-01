import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'

export default function Home() {

  const [red, setRed] = useState<number>(255)
  const [green, setGreen] = useState<number>(255)
  const [blue, setBlue] = useState<number>(255)
  const [uiColorRed, setUiColorRed] = useState<string>()
  const [uiColorGreen, setUiColorGreen] = useState<string>()
  const [uiColorBlue, setUiColorBlue] = useState<string>()
  const [copy, setCopy] = useState<boolean>(false)

  let code = `<color key="backgroundColor" red="${uiColorRed}" green="${uiColorGreen}" blue="${uiColorBlue}" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>`;

  useEffect(() => {
    if(red > 255) {
      setRed(255)
    }

    if(green > 255) {
      setGreen(255)
    }

    if(blue > 255) {
      setBlue(255)
    }

    let uiRed = red / 255;
    let uiGreen = green / 255;
    let uiBlue = blue / 255;

    setUiColorRed(uiRed === 0 ? '0.0' : uiRed.toString())
    setUiColorGreen(uiGreen === 0 ? '0.0' : uiGreen.toString())
    setUiColorBlue(uiBlue === 0 ? '0.0' : uiBlue.toString())
  }, [red, green, blue])

  function showsCopy(text: string) {
    if(text !== null) {
      navigator.clipboard.writeText(text);
      setCopy(true)

      setTimeout(() => {
        setCopy(false)
      }, 3000)
    }
  }

  return (
    <div className={styles.content} style={{backgroundColor: `rgba(${red}, ${green}, ${blue})`}}>
      <div className={`${copy ? styles.copy : null}`}></div>
      <div className={styles.centerContent}>
        <h3>Convert RGB to UiColors</h3>
        <div className={styles.inputs}>
          <div className={styles.contentInput}>
            <em>Red:</em>
            <input className={styles.inputRgb} type={'number'} value={`${red}`} max={255} maxLength={3} onChange={({target}) => setRed(+target.value)}/>
          </div>
          <div className={styles.contentInput}>
            <em>Green:</em>
            <input className={styles.inputRgb} type={'number'} value={`${green}`} max={255} maxLength={3} onChange={({target}) => setGreen(+target.value)}/>
          </div>
          <div className={styles.contentInput}>
            <em>Blue:</em>
            <input className={styles.inputRgb} type={'number'} value={`${blue}`} max={255} maxLength={3} onChange={({target}) => setBlue(+target.value)}/>
          </div>
        </div>
        <div className={styles.uiColors}>
          <p onClick={() => showsCopy(`${uiColorRed}`)}>red: <span>{uiColorRed}</span></p>
          <p onClick={() => showsCopy(`${uiColorGreen}`)}>green: <span>{uiColorGreen}</span></p>
          <p onClick={() => showsCopy(`${uiColorBlue}`)}>blue: <span>{uiColorBlue}</span></p>
        </div>
        <p>Código Xamarin.iOS &gt; LaunchScreen.storyboard dentro da tag code:</p>
        <code className={styles.code} onClick={() => showsCopy(code)}>
          {code}
        </code>
      </div>
    </div>
  )
}
