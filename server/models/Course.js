const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  instructor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  price: { 
    type: Number, 
    default: 0 
  },
  duration: { 
    type: Number, // in minutes
    required: true 
  },
  level: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'], 
    default: 'beginner' 
  },
  topics: [{ 
    type: String 
  }],
  enrolledStudents: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'], 
    default: 'draft' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt timestamp before saving
CourseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Course', CourseSchema); 