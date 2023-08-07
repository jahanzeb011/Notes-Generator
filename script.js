const form = document.getElementById('chat-form');
const mytextInput = document.getElementById('mytext');
const responseTextarea = document.getElementById('response');
const btn = document.querySelector(".button");

const API_KEY = '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';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.classList.add("button--loading");
    const mytext = mytextInput.value.trim();
    if (mytext) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: mytext }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                btn.classList.remove("button--loading");
                responseTextarea.value = data.choices[0].message.content;
            } else {
                btn.classList.remove("button--loading");
                responseTextarea.value = 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            btn.classList.remove("button--loading");
            responseTextarea.value = 'Error: Unable to process your request.';
        }
    }
});

function save() {
    if( responseTextarea.value !=='' ){
        
    
    const primes = responseTextarea.value;
    const blob = new Blob([primes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes_generator.txt";
    a.click();
  
    // Clean up the URL object to free memory
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 0);}

  }

  function goToIndexPage() {
    window.location.href = "index.html";
  }