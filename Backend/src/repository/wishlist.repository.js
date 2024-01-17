// author: Preetha Kachhadiya

const { Wishlist } = require('../model/Wishlist.model')
const { Event } = require('../model/Event.model')
const mongoose = require('mongoose')

// const createWishlist = async data => {
//   return Wishlist.create(data)
// }

const addEventToWishlist = async payload => {
  const { userId = '', eventId = '' } = payload
  try {
    // Check if a record with the given userId exists
    const existingWishlist = await Wishlist.findOne({
      userId: mongoose.Types.ObjectId(userId)
    })

    if (!existingWishlist) {
      // If no record found, create a new record with userId and eventId
      const newWishlist = new Wishlist({
        userId,
        events: [eventId]
      })
      await newWishlist.save()
    } else {
      // If record found, add the eventId to the events array if it doesn't already exist
      if (!existingWishlist.events.includes(eventId)) {
        existingWishlist.events.push(eventId)
        await existingWishlist.save()
      }
    }

    return { success: true }
  } catch (error) {
    throw new Error('Error adding event to wishlist.')
  }
}

const removeEventFromWishlist = async payload => {
  const { userId = '', eventId = '' } = payload

  try {
    // Check if a record with the given userId exists
    const existingWishlist = await Wishlist.findOne({
      userId: mongoose.Types.ObjectId(userId)
    })

    if (existingWishlist) {
      // If record found, remove the eventId from the events array if it exists
      const index = existingWishlist.events.indexOf(eventId)
      if (index !== -1) {
        existingWishlist.events.splice(index, 1)
        await existingWishlist.save()
      }
    }

    return { success: true }
  } catch (error) {
    throw new Error('Error removing event from wishlist.')
  }
}

const getAllEventsFromWishlist = async queryParams => {
  const { sortBy = '', filterBy = '', userId = '' } = queryParams

  // if (sortBy)
  //   //   const cursor = await Event.find({}).skip(skip).limit(limit)
  //   return {
  //     count: await Event.countDocuments(),
  //     events: cursor
  //   }

  try {
    let query = { userId: mongoose.Types.ObjectId(userId) }

    // Apply filtering based on filterBy option
    if (filterBy === 'thisWeek') {
      const today = new Date()
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      query['dateAndTime'] = { $gte: oneWeekAgo, $lte: today }
    } else if (filterBy === 'thisMonth') {
      const today = new Date()
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      query['dateAndTime'] = { $gte: firstDayOfMonth, $lte: today }
    } else if (filterBy === 'withinSixMonths') {
      const today = new Date()
      const sixMonthsAgo = new Date() // 6 months ago
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() + 6)
      query['dateAndTime'] = { $lte: sixMonthsAgo, $gte: today }
    }

    // Apply sorting based on sortBy option
    const sortOptions = {}
    if (sortBy === 'date') {
      sortOptions['dateAndTime'] = 1 // 1 for ascending, -1 for descending
    } else if (sortBy === 'nameAscending') {
      sortOptions['name'] = 1
    } else if (sortBy === 'nameDescending') {
      sortOptions['name'] = -1
    }

    console.log(query, sortOptions)

    const wishlistItems = await Wishlist.find(query).populate({
      path: 'events',
      match: query, // Applying the same filter on events as well
      options: { sort: sortOptions } // Applying the sorting options on events
    })

    return wishlistItems[0]
  } catch (error) {
    throw new Error('Error while fetching wishlist items.' + error.message)
  }
}

const checkEventInWishlist = async queryParams => {
  const { eventId = '', userId = '' } = queryParams

  // Check if the user's wishlist contains the event_id
  const wishlist = await Wishlist.findOne({
    userId: mongoose.Types.ObjectId(userId),
    events: { $in: [mongoose.Types.ObjectId(eventId)] }
  })

  console.log('inWIshlish', wishlist);

  const isEventInWishlist = wishlist ? true : false
  return {isEventInWishlist}
}

module.exports = {
  // createWishlist,
  getAllEventsFromWishlist,
  addEventToWishlist,
  removeEventFromWishlist,
  checkEventInWishlist
}
