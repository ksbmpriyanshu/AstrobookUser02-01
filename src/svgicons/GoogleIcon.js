import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function GoogleIcon(props) {
  return (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_251_5514)">
        <Path
          d="M17.572 14.583v6.574h9.134c-.4 2.113-1.604 3.903-3.41 5.107l5.509 4.274c3.21-2.962 5.06-7.314 5.06-12.483 0-1.203-.107-2.36-.308-3.472H17.572z"
          fill="#4285F4"
        />
        <Path
          d="M8.059 20.9l-1.242.95-4.398 3.426c2.793 5.54 8.517 9.366 15.152 9.366 4.582 0 8.424-1.512 11.233-4.104l-5.509-4.274c-1.512 1.018-3.44 1.636-5.724 1.636-4.413 0-8.163-2.978-9.505-6.99l-.007-.01z"
          fill="#34A853"
        />
        <Path
          d="M2.42 10.063a16.764 16.764 0 00-1.821 7.606c0 2.747.663 5.324 1.82 7.607 0 .016 5.648-4.382 5.648-4.382a10.17 10.17 0 01-.54-3.225c0-1.126.2-2.206.54-3.225l-5.648-4.382z"
          fill="#FBBC05"
        />
        <Path
          d="M17.571 7.455c2.5 0 4.722.864 6.496 2.53l4.86-4.86C25.98 2.378 22.154.696 17.572.696c-6.635 0-12.36 3.812-15.152 9.366l5.647 4.382c1.343-4.011 5.092-6.99 9.505-6.99z"
          fill="#EA4335"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_251_5514">
          <Path
            fill="#fff"
            transform="translate(.599 .696)"
            d="M0 0H33.946V33.946H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default GoogleIcon