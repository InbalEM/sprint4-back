const express = require('express')
const router = express.Router()
module.exports = router
const {MongoClient} = require('mongodb')

const stayService = require('./stay.service')
const logger = require('../../service/logger.service') 

// GET LIST
async function getStays(req, res){
    try {
        logger.debug('Getting Stays')
        var queryParams = req.query
        const stays = await stayService.query(queryParams)
        res.json(stays)
      } catch (err) {
        logger.error('Failed to get stays', err)
        res.status(500).send({ err: 'Failed to get stays' })
      }
}

// READ=GET BY ID 
async function getStayById(req, res) {
    try {
      const stayId = req.params.id
      const stay = await stayService.getById(stayId)
      res.json(stay)
    } catch (err) {
      logger.error('Failed to get stay', err)
      res.status(500).send({ err: 'Failed to get stay' })
    }
  }

  async function addStay(req, res) {
    try {
      const stay = req.body
      const addedStay = await stayService.add(stay)
      res.json(addedStay)
    } catch (err) {
      logger.error('Failed to add stay', err)
      res.status(500).send({ err: 'Failed to add stay' })
    }
  }

  async function updateStay(req, res) {
    try {
        const stay = req.body
        const updatedStay = await stayService.update(stay)
        res.json(updatedStay)
      } catch (err) {
        logger.error('Failed to update stay', err)
        res.status(500).send({ err: 'Failed to update stay' })
    
      }
}

async function removeStay(req, res) {
    try {
      const stayId = req.params.id;
      const removedId = await stayService.remove(stayId)
      res.send(removedId)
    } catch (err) {
      logger.error('Failed to remove stay', err)
      res.status(500).send({ err: 'Failed to remove stay' })
    }
  }

  module.exports = {
    getStays,
    getStayById,
    addStay,
    updateStay,
    removeStay
  }
  