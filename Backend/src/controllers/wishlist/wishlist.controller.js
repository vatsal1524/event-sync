// author: Preetha Kachhadiya

const { StatusCodes } = require('http-status-codes')
const { response } = require('../../utils/response')
const wishlistRepository = require('../../repository/wishlist.repository')
const { Message } = require('../../utils/Message')

const getAllEventsFromWishlist = async (req, res) => {
  try {
    const queryParams = req.body
    const result = await wishlistRepository.getAllEventsFromWishlist(
      queryParams
    )
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.WISHLIST.GET
    )
  } catch (error) {
    console.log(error)
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      {},
      Message.INTERNAL_SERVER_ERROR
    )
  }
}

const addEventToWishlist = async (req, res) => {
  try {
    const data = req.body
    const result = await wishlistRepository.addEventToWishlist(data)
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.WISHLIST.ADD
    )
  } catch (error) {
    console.log(error)
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      {},
      Message.INTERNAL_SERVER_ERROR
    )
  }
}

const removeEventFromWishlist = async (req, res) => {
  try {
    // const eventId = req.params?.id
    const data = req.body
    const result = await wishlistRepository.removeEventFromWishlist(data)
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.WISHLIST.REMOVE
    )
  } catch (error) {
    console.log(error)
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      {},
      Message.INTERNAL_SERVER_ERROR
    )
  }
}

const checkEventInWishlist = async (req, res) => {
  try {
    const queryParams = req.body
    const result = await wishlistRepository.checkEventInWishlist(
      queryParams
    )
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.WISHLIST.GET
    )
  } catch (error) {
    console.log(error)
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      {},
      Message.INTERNAL_SERVER_ERROR
    )
  }
}

// const getEventById = async (req, res) => {
//   try {
//     const eventId = req.params?.id
//     const result = await wishlistRepository.getEventById(eventId)
//     return response(
//       res,
//       StatusCodes.ACCEPTED,
//       true,
//       result,
//       Message.EVENT.CREATE
//     )
//   } catch (error) {
//     console.log(error)
//     return response(
//       res,
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       false,
//       {},
//       Message.INTERNAL_SERVER_ERROR
//     )
//   }
// }

// const completeEventById = async (req, res) => {
//   try {
//     const eventId = req.params?.id
//     const data = {
//       isCompleted: true
//     }
//     const result = await wishlistRepository.updateEvent(eventId, data)
//     return response(
//       res,
//       StatusCodes.ACCEPTED,
//       true,
//       result,
//       Message.EVENT.COMPLETE
//     )
//   } catch (error) {
//     console.log(error)
//     return response(
//       res,
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       false,
//       {},
//       Message.INTERNAL_SERVER_ERROR
//     )
//   }
// }

// const cancelEvent = async (req, res) => {
//   try {
//     const eventId = req.params?.id
//     const result = await wishlistRepository.cancelEvent(eventId)
//     return response(
//       res,
//       StatusCodes.ACCEPTED,
//       true,
//       result,
//       Message.EVENT.DELETE
//     )
//   } catch (error) {
//     console.log(error)
//     return response(
//       res,
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       false,
//       {},
//       Message.INTERNAL_SERVER_ERROR
//     )
//   }
// }

module.exports = {
  getAllEventsFromWishlist,
  addEventToWishlist,
  removeEventFromWishlist,
  checkEventInWishlist
  // completeEventById,
  // cancelEvent,
  // getEventById
}
