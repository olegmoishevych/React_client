import React, {useEffect} from 'react'
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'
import Box from '@mui/material/Box'
import {ShowPacksCards} from './ShowPacksCards'
import {NumberOfCards} from './NumberOfCards'
import {AddNewPack} from './AddNewPack'
import {TablePacks} from './TablePacks'
import {PaginationPacksList} from './PaginationPacksList'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {getPacksCardTC} from '../../redux/packsReducer'
import {InputSearchPacksCard} from './InputSearchPacksCard'
import {RequestStatus} from '../../redux/appReducer'

export const PacksList = () => {
    const sort = useAppSelector((state) => state.packsCard.sortPacks)
    const page = useAppSelector((state) => state.packsCard.page)
    const pageCount = useAppSelector((state) => state.packsCard.pageCount)
    const packName = useAppSelector((state) => state.packsCard.packName)
    const whosePackCard = useAppSelector((state) => state.packsCard.whosePackCard)
    const requestStatus = useAppSelector((state) => state.app.request.status)
    
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(getPacksCardTC())
    }, [sort, pageCount, page, packName, whosePackCard])
    
    const onClickFilterDefaultHandler = () => {
        dispatch(getPacksCardTC(true))
    }
    
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '50px',
                    width: '100%',
                    height: '100vh',
                }}
            >
                <Box
                    sx={{
                        width: '1000px',
                        height: '600px',
                    }}
                >
                    <AddNewPack/>
                    <Box
                        sx={{
                            marginTop: '30px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <InputSearchPacksCard/>
                        <ShowPacksCards/>
                        <NumberOfCards/>
                        <Box
                            sx={{
                                alignSelf: 'flex-end',
                                marginBottom: '2px',
                            }}
                        >
                            <Box
                                sx={{
                                    marginTop: '30px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '36px',
                                    height: '36px',
                                    background: '#FFFFFF',
                                    border: '1px solid #D9D9D9',
                                    borderRadius: '2px',
                                }}
                            >
                                <FilterAltOffOutlinedIcon
                                    sx={
                                        !(requestStatus === RequestStatus.loading)
                                            ? {
                                                transition: '0.5s',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    color: '#1976d2',
                                                    transition: '0.5s',
                                                },
                                            }
                                            : {}
                                    }
                                    onClick={
                                        requestStatus === RequestStatus.loading
                                            ? () => {
                                            }
                                            : onClickFilterDefaultHandler
                                    }
                                />
                            </Box>
                        </Box>
                    </Box>
                    <TablePacks/>
                    <PaginationPacksList/>
                </Box>
            </Box>
            )
        </>
    )
}
