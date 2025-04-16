import { useEffect, useState } from "react";

const ManagePartners = () => {
  const [partners, setPartners] = useState([]);
  const [newPartner, setNewPartner] = useState({
    name: "",
    image: "",
    link: "",
    imageFile: null,
  });

  useEffect(() => {
    fetch("/partners")
      .then((response) => response.json())
      .then((data) => setPartners(data))
      .catch((error) => console.error("Error fetching partners:", error));
  }, []);

  const handleInputChange = (event) => {
    setNewPartner({
      ...newPartner,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewPartner({
      ...newPartner,
      imageFile: file,
    });
  };

  const handleAddPartner = () => {
    fetch("/partners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPartner),
    })
    .then((response) => response.json())
    .then((data) => {
      // Simulate file upload
      console.log("Simulating file upload:", newPartner.imageFile);
      const imageName = newPartner.imageFile ? newPartner.imageFile.name : "";
      setPartners([...partners, { ...data, image: imageName }]);
      setNewPartner({ name: "", image: "", link: "", imageFile: null });
    })
      .catch((error) => console.error("Error adding partner:", error));
  };

  const handleDeletePartner = (partnerId) => {
    fetch(`/partners/${partnerId}`, {
      method: "DELETE",
    })
      .then(() => {
        setPartners(partners.filter((partner) => partner.id !== partnerId));
      })
      .catch((error) => console.error("Error deleting partner:", error));
  };

  return ` <section class="manage-partners">
    <h2>Manage Partner Logos</h2>
    <div class="add-partner">
        <h3>Add New Partner</h3>
        <input type="text" name="name" placeholder="Partner Name" value="${
          newPartner.name
        }" oninput="this.getRootNode().host.handleInputChange(event)"/>
        <input type="file" name="imageFile" onchange="this.getRootNode().host.handleFileChange(event)"/>
        <p>
          ${newPartner.imageFile ? "Selected file: "+newPartner.imageFile.name : ""} </p>
        <input type="text" name="link" placeholder="Partner Link" value="${
          newPartner.link
        }" oninput="this.getRootNode().host.handleInputChange(event)"/>
        <button onclick="this.getRootNode().host.handleAddPartner()">Add Partner</button>
    </div>
    <div class="partners-list">
        <h3>Current Partners</h3>
        <ul>
            ${partners
              .map(
                (partner) => `
                <li>${partner.name} - ${partner.link} <button onclick="this.getRootNode().host.handleDeletePartner(${partner.id})">Delete</button></li>
            `
              )
              .join("")}
        </ul>
    </div>
</section>
`;
};

export default ManagePartners;