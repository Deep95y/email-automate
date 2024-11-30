// import './dashboard.css';
import { FaUser, FaPlus } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const Dashboard = () => {
    
    return(

        <>
      <div style={{background:'lightblue',height:'100vh',}}> 
        <div className="box1" style={{display:'flex',flexDirection:'row',height:'5rem',width:'15rem',background:'white',color:'white',paddingLeft:'1rem',paddingTop:'1rem',boxShadow:'1px solid #ccc',margin:'auto'}}>
        <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "50px",
        backgroundColor: "#ffe6eb",
        borderRadius: "5px",
        position: "relative",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginTop:'8px',
      }}
    >
      {/* User Icon */}
      <FaUser style={{ color: "#ff4d6d", fontSize: "24px" }} />
      {/* Plus Icon */}
      <FaPlus
        style={{
          color: "#ff4d6d",
          fontSize: "12px",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      />
    </div>
            <div className="textarea" style={{paddingLeft:'1rem',display:'flex',flexDirection:'column'}}>
               <div style={{fontSize:'1.3rem',fontWeight:'bold',marginTop:'0.6rem',color:'grey'}}>Leads From</div>
               <div style={{position:'absolute',marginTop:'2.1rem',color:'pink'}}>Test List</div>
            </div>
        </div>

    <div style={{height:'3rem',width:'13rem',background:'white',color:'black',marginTop:'1rem',textAlign:'center',paddingTop:'1.5rem',fontSize:'1.3rem',margin:'auto'}}>
        Sequence start point

    </div>

    <div style={{display:'flex',flexDirection:'column',height:'5rem',width:'17rem',background:'white',color:'black',fontSize:'1rem',marginTop:'1rem',alignItems:'center',paddingTop:'1rem',gap:'3px',margin:'auto'}}>
          <div style={{fontSize:'1.3rem',fontWeight:'bold'}}>+</div>
          <div>Add lead source</div>
          <div>Click to add leads from list or CRM</div>
    </div>

       <div style={{display:'flex',flexDirection:'row',height:'9rem',width:'15rem',background:'white',color:'black',paddingLeft:'1rem',marginTop:'1rem',alignItems:'center',margin:'auto',}}>

      <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "50px",
        backgroundColor: "#e8d9fc",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Envelope Icon */}
      <FaEnvelope style={{ color: "#8a2be2", fontSize: "24px" }} />
    </div>
    <div style={{paddingLeft:'1rem'}}>
        Email
    </div>
    </div>
    </div>
        </>
    );
}

export default Dashboard;