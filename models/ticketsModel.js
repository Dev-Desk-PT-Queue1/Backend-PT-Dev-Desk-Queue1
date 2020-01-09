const db = require('../data/dbConfig')

module.exports = {

    getAllTickets: () => {
        return db('tickets');
      },
    
    getTicketByID: (id) => {
        return db('tickets').where({ id }).first();
      },

    getTicketsCreatedByUser: (user_id) => {
        return db('tickets').where({ user_id });
      },

    getTicketsAssignedToUser: (assignedUser) => {
        return db('tickets').where({ assignedUser });
      },

    createTicket: async (ticket) => {
        const [id] = await db('tickets').insert(ticket);
        return db('tickets').where({ id }).first();
      },
    
    updateTicket: async (id, updatedTicket) => {
        const updated = await db('tickets').where({ id }).update(updatedTicket);
        return db('tickets').where({ id }).first();
      },
    
    deleteTicket: async (id) => {
        await db('tickets').where({ id }).del();
        return db('tickets');
    }
}