import React, { SyntheticEvent, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Slider } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { getPacksCardTC, setMinMaxValueAC } from '../../redux/packsReducer'
import { RequestStatus } from '../../redux/appReducer'

export const NumberOfCards = () => {
    const minCountCards = useAppSelector((state) => state.packsCard.minCardsCount)
    const maxCountCards = useAppSelector((state) => state.packsCard.maxCardsCount)
    const max = useAppSelector((state) => state.packsCard.slider.max)
    const min = useAppSelector((state) => state.packsCard.slider.min)
    const requestStatus = useAppSelector((state) => state.app.request.status)

    const dispatch = useAppDispatch()

    const [value, setValue] = useState<Array<number>>([min, max])

    useEffect(() => {
        setValue([min, max])
    }, [max, min])

    useEffect(() => {
        dispatch(setMinMaxValueAC(minCountCards, maxCountCards))
    }, [maxCountCards, minCountCards])

    const handleChangeCommitted = (
        event: Event | SyntheticEvent<Element, Event>,
        value: number | number[]
    ) => {
        let newValue = value as [number, number]
        setValue(newValue as number[])
        dispatch(setMinMaxValueAC(newValue[0], newValue[1]))
        dispatch(getPacksCardTC())
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                }}
            >
                <Typography variant="h6">Number of cards</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '10px',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '36px',
                            height: '36px',
                            background: '#FFFFFF',
                            border: '1px solid #D9D9D9',
                            borderRadius: '2px',
                            margin: '0 15px 0 0',
                        }}
                    >
                        <Typography>{value[0]}</Typography>
                    </Box>
                    <Slider
                        disabled={requestStatus === RequestStatus.loading}
                        sx={{
                            width: '155px',
                        }}
                        getAriaLabel={() => 'range'}
                        value={[value[0], value[1]]}
                        onChange={(_, newValue) => {
                            setValue(newValue as number[])
                        }}
                        onChangeCommitted={handleChangeCommitted}
                        valueLabelDisplay="off"
                        min={minCountCards}
                        max={maxCountCards}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '36px',
                            height: '36px',
                            background: '#FFFFFF',
                            border: '1px solid #D9D9D9',
                            borderRadius: '2px',
                            margin: '0 0 0 15px',
                        }}
                    >
                        <Typography>{value[1]}</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
