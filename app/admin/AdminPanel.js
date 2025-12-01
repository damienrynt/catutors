'use client';
import { useState } from 'react';

export default function AdminPanel() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    temporaryPassword: '',
    subjects: '',
    bio: '',
    hourly_rate: '',
    contact_email: '',
    contact_phone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/admin/create-tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adminPassword: prompt('Enter admin password:'), // You'll enter your password here
        tutorData: {
          ...formData,
          subjects: formData.subjects.split(',').map(s => s.trim())
        }
      })
    });

    if (response.ok) {
      alert('Tutor created successfully!');
      setFormData({
        email: '', name: '', temporaryPassword: '', subjects: '', 
        bio: '', hourly_rate: '', contact_email: '', contact_phone: ''
      });
    } else {
      alert('Error creating tutor');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1>Add New Tutor</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Tutor Email" value={formData.email} 
               onChange={e => setFormData({...formData, email: e.target.value})} required />
        <input type="text" placeholder="Full Name" value={formData.name} 
               onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input type="text" placeholder="Temporary Password" value={formData.temporaryPassword} 
               onChange={e => setFormData({...formData, temporaryPassword: e.target.value})} required />
        <input type="text" placeholder="Subjects (comma separated)" value={formData.subjects} 
               onChange={e => setFormData({...formData, subjects: e.target.value})} required />
        <textarea placeholder="Bio" value={formData.bio} 
                  onChange={e => setFormData({...formData, bio: e.target.value})} />
        <input type="number" placeholder="Hourly Rate" value={formData.hourly_rate} 
               onChange={e => setFormData({...formData, hourly_rate: e.target.value})} />
        <input type="email" placeholder="Contact Email" value={formData.contact_email} 
               onChange={e => setFormData({...formData, contact_email: e.target.value})} />
        <input type="text" placeholder="Contact Phone" value={formData.contact_phone} 
               onChange={e => setFormData({...formData, contact_phone: e.target.value})} />
        <button type="submit">Create Tutor Account</button>
      </form>
    </div>
  );
}