
export default function Contact() {
  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "#2e7d32" }}>Contact Us</h2>
      <form style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        backgroundColor: "#f1f8e9",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}>
        <input type="text" placeholder="Your Name" style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }} />
        <input type="email" placeholder="Your Email" style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }} />
        <textarea placeholder="Your Message" rows="4" style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }} />
        <button type="submit" style={{
          backgroundColor: "#2e7d32",
          color: "white",
          padding: "12px",
          borderRadius: "5px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}>
          Send
        </button>
      </form>
    </div>
  );
}
