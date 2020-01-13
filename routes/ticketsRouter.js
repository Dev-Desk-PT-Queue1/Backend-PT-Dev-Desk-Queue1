const express = require('express');
const router = express.Router();
const jwtToken = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || 'everygoodboydoesfine'

const Tickets = require('../models/ticketsModel');
const Users = require('../models/usersModel');
const { authenticate } = require('../middleware/middleware');

router.use(express.json());

router.get('/tickets', async (req, res) => {
    const tickets = await Tickets.getAllTickets();  
    res.status(200).json(tickets);
});
  
router.get('/tickets/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const ticket = await Tickets.getTicketByID(id);  
    if(ticket){
      res.status(200).json(ticket);
    } else {
      res.status(404).json({msg: 'Ticket not found'})
    }
});

router.get('/tickets/user/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const user = await Users.getUserByID(id);    
    if(user){
      const tickets = await Tickets.getTicketsCreatedByUser(id);      
      if(tickets){
        res.status(200).json(tickets);
      } else {
        res.status(404).json({msg: 'User does not have any tickets'});
      }
    } else {
      res.status(404).json({msg: 'User not found'});
    }
});
  
router.post('/tickets', async (req, res) => {
    const { title, description, category, user_id } = req.body;  
    if(title || description || category || user_id){
      const ticket = await Tickets.createTicket(req.body);
      res.status(201).json(ticket);
    } else {
      res.status(422).json({message: 'Missing required field'});
    }
});

  router.put('/tickets/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const updatedTicket = req.body;  
    const ticket = await Tickets.getTicketByID(id);  
    if(ticket){
      Tickets.updateTicket(id, updatedTicket)
             .then(ticket => {
               res.status(200).json(ticket);
             })
             .catch(err => {
               res.status(500).json(err);
             });
    } else {
      res.status(404).json({msg: 'Ticket does not exsist'});
    }  
});  

router.delete('/tickets/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const ticket = await Tickets.getTicketByID(id);  
    if(ticket){
      Tickets.deleteTicket(id)
             .then(count => {
               res.status(200).json(count);
             })
             .catch(err => {
               res.status(500).json(err);
             });
    } else {
      res.status(404).json({msg: 'Ticket does not exsist'});
    }  
});

module.exports = router;