let userName = "";
const messages = ["Soch lo!", "Pakka nahi?", "Try again!", "Ek baar aur!", "Hehe, no!"];

window.goToValentine = function() {
    const input = document.getElementById('pName');
    if (input.value.trim() !== "") {
        userName = input.value.trim();
        document.getElementById('nameScreen').style.display = 'none';
        document.getElementById('valentineScreen').style.display = 'block';
        document.getElementById('qText').innerHTML = `Oye <b>${userName}</b>,<br>kya tum meri Valentine banogi? ❤️`;
    } else {
        alert("Naam likhna zaroori hai! 😊");
    }
};

window.moveNo = function() {
    const btn = document.getElementById('noBtn');
    const padding = 50;
    const maxX = window.innerWidth - btn.offsetWidth - padding;
    const maxY = window.innerHeight - btn.offsetHeight - padding;

    const randomX = Math.floor(Math.random() * (maxX - padding)) + padding;
    const randomY = Math.floor(Math.random() * (maxY - padding)) + padding;

    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.innerText = messages[Math.floor(Math.random() * messages.length)];
};

window.celebrate = function() {
    // 1. Firebase call (Important!)
    if (typeof window.saveValentineData === "function") {
        window.saveValentineData(userName);
    } else {
        console.error("Error: saveValentineData function not found!");
    }

    // 2. Confetti Effect
    if (typeof confetti === "function") {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffccd5']
        });
    }

    // 3. UI Update
    const box = document.getElementById('mainBox');
    box.innerHTML = `
        <div class="gif-container">
            <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2twbGFjcnFhczN0ODNvcW5zNDc1b2NhaDlwdTVncXBvOWx5OTdtMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hxERQNWQudqSF1iDnr/giphy.gif" alt="celebration">
        </div>
        <h1 class="success-msg">Yayyy! I knew it, ${userName}! ❤️😍</h1>
        <p style="color:#666; margin-bottom:20px;">Ab hamari date pakki!</p>
        <button id="yesBtn" onclick="window.shareWA()">WhatsApp par batao 💌</button>
    `;
    document.body.style.background = "#ffccd5";
};

window.shareWA = function() {
    const text = encodeURIComponent(`Hey! Maine tumhara Valentine proposal accept kar liya hai! ❤️`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
};