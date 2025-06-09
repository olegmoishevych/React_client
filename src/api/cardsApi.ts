import {CardsStateType, CardType, EditCardType, GetCardsParamsType, NewCardType} from './types'
import {instance} from './instance'
import {getDataFromAxiosResponse, parseAxiosError} from './responseParsers'

export const cardsApi = {
    putLearnCards(grade: number, card_id: string) {
        return instance
            .put<UpdatedGradeType>('/cards/grade', {grade: grade, card_id: card_id})
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
    getCards(params: GetCardsParamsType) {
        return instance
            .get<CardsStateType>('/cards/card', {params})
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
    createCard(card: NewCardType) {
        return instance
            .post('/cards/card', {card}) 
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
    deleteCard(cardId: string) {
        return instance
            .delete('/cards/card?id=' + cardId) //response object not required
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
    updateCard(editCard: EditCardType) {
        return instance
            .put<CardType>('/cards/card', {card: editCard}) //response object not required
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
}

export type UpdatedGradeType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

export type ResponseType = {
    grade: number
    card_id: string
}
