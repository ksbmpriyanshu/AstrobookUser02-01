import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

let interval;

const CountDown = ({ duration, updateState }) => {
    const [timer, setTimer] = useState(duration)

    useEffect(() => {
        try {
            setTimer(duration)
            if (duration) {
                interval = setInterval(() => {
                    setTimer(prev => {
                        if (prev - 1 <= 0) {
                            clearInterval(interval)
                            updateState()
                        }
                        return prev - 1
                    })
                }, 1000)
            }
        } catch (e) {
            console.log(e)
            clearInterval(interval)
        }
        return ()=>clearInterval(interval)
    }, [duration])

    return (
        <Text>{timer}</Text>
    )
}

export default CountDown