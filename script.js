
// ===== DEMO LEADS =====

const leads = [
  {
    name: "Fit Gym",
    industry: "Fitness",
    email: "fitgym@gmail.com",
    linkedin: "linkedin.com/company/fitgym",
    website: "www.fitgym.com"
  },
  {
    name: "Dental Care Pro",
    industry: "Dental Clinic",
    email: "contact@dentalcare.com",
    linkedin: "linkedin.com/company/dentalcare",
    website: "www.dentalcare.com"
  }
];


// ===== RENDER LEADS =====

const leadsContainer = document.getElementById("leads");

function renderLeads() {

  leadsContainer.innerHTML = "";

  leads.forEach((lead, index) => {

    leadsContainer.innerHTML += `
    
      <div class="lead-card">
        <h3>${lead.name}</h3>
        <p>${lead.industry}</p>
        <p>${lead.email}</p>

        <div class="lead-links">
          <a href="https://${lead.linkedin}" target="_blank">
            LinkedIn
          </a>

          <a href="https://${lead.website}" target="_blank">
            Website
          </a>
        </div>

        <button onclick="generateOutreach(${index})">
          Generate Outreach
        </button>
      </div>

    `;
  });
}

renderLeads();


// ===== AI OUTREACH =====

async function generateOutreach(index) {

  const lead = leads[index];

  const output = document.getElementById("ai-output");

  output.innerHTML = "Generating AI outreach...";

  try {

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question:
          `Write a cold outreach email for 
          ${lead.name} in the ${lead.industry} industry.`
      })
    });

    const data = await res.json();

    const message =
      data.choices?.[0]?.message?.content ||
      data.reply ||
      data.error ||
      "No response";

    output.innerHTML = `
      <div class="ai-result">
        <h3>AI Outreach</h3>
        <p>${message}</p>

        <button onclick="copyText()">
          Copy
        </button>
      </div>
    `;

  } catch (err) {

    output.innerHTML = `
      Error generating outreach.
    `;
  }
}


// ===== COPY FUNCTION =====

function copyText() {

  const text =
    document.querySelector(".ai-result p").innerText;

  navigator.clipboard.writeText(text);

  alert("Copied!");
}
