const Session = require("../models/Session")
const mongoose = require("mongoose")



const addSession = async (req, res) => {
    const newSessions = req.body
    const addedSessions = []

    for (const newSession of newSessions) {
        const exists = await Session.findOne({
          name: newSession.name,
          date: newSession.date,
          time: newSession.time,
        });
    
        if (!exists) {
          const sessionToAdd = new Session(newSession);
          await sessionToAdd.save();
          addedSessions.push(newSession);
        }
      }
    
      res.status(200).json({ added: addedSessions });
}

const getSessions = async (req, res) => {
    const sessions = await Session.find({}).sort({createdAt: 1})
    res.status(200).json(sessions)
}


module.exports = {
    addSession,
    getSessions
}