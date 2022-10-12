const fs = require('fs')
const ObjectId = require('mongodb').ObjectId

const dbService = require('../../service/db.service')

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)

        const collection = await dbService.getCollection('stay')
        var stays = await collection.find(criteria).toArray()
        console.log('stay[0]:', stays[0].reviews[0].rate)

        // if (!stays[0].reviews[0].rate) {
        //     stays.forEach(stay => {
        //        stay.reviews.forEach(review => {
        //            return review.rate = utilService.getRandomIntInclusive(3, 5)
        //             console.log(review.rate)
                   
        //         })
        //         update(stay)}
        //     )

        // //     // update(stay)
        // }


        return stays
    } catch (err) {
        logger.error('cannot find cars', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    if (filterBy.name) {
        const txtCriteria = { $regex: filterBy.name, $options: 'i' }
        criteria.name = txtCriteria
    }
    if (filterBy.minPrice && filterBy.maxPrice) {
        criteria.price = { $gt: +filterBy.minPrice, $lt: +filterBy.maxPrice }
    }
    if (filterBy.label) {
        const labelCriteria = { $regex: filterBy.label, $options: 'i' }
        criteria.type = labelCriteria
    }
    // if (filterBy.amenities) { //יש לעדכן את הפרונט למערך
    //     criteria.amenities = { amenities: { $in: filterBy.amenities } }
    // }
    if (filterBy.where) {
        const locCriteria = { $regex: filterBy.where, $options: 'i' }
        criteria['loc.country'] = locCriteria
    }
    console.log('criteria', criteria)
    return criteria
}


async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stay = collection.findOne({ _id: ObjectId(stayId) })
        return stay
    } catch (err) {
        console.log('err:', err)
        logger.error(`while finding car ${stayId}`, err)
        throw err
    }
}

async function add(stay) {
    try {
        const collection = await dbService.getCollection('stay')
        const addedStay = await collection.insertOne(stay)
        return addedStay
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }
}

async function update(stay) {
    try {
        var id = ObjectId(stay._id)
        delete stay._id
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: id }, { $set: { ...stay } })
        return stay
    } catch (err) {
        logger.error(`cannot update stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ _id: ObjectId(stayId) })
        return stayId
    } catch (err) {
        logger.error(`cannot remove car ${stayId}`, err)
        throw err
    }
}

module.exports = {
    query,
    add,
    update,
    getById,
    remove
}