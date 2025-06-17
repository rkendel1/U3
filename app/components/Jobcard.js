// components/JobCard.js
export default function JobCard({ job }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <span>Budget: ${job.budget}</span>
      <div>Posted by: {job.user?.name || 'Unknown'}</div>
    </div>
  );
}