const fs = require('fs');

const generateData = () => {
    const data = {
        cities: [],
        users: [],
        user_roles: [],
        artist_profiles: [],
        business_profiles: [],
        menus: [],
        menu_items: [],
        events: [],
        event_artists: [],
        tickets: [],
        event_attendees: [],
        payments: [],
        videos: [],
        video_likes: [],
        comments: [],
        favorites: [],
        follows: [],
        reviews: [],
        notifications: [],
        event_views: [],
        video_views: [],
        reports: [],
        tags: [],
        promotions: [],
        user_interests: []
    };

    // Helper functions
    const rInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const rItem = (arr) => arr[rInt(0, arr.length - 1)];
    const uId = (prefix, i) => `${prefix}${i}`;
    const isoDate = (daysOffset) => new Date(Date.now() + daysOffset * 86400000).toISOString();

    const cityNames = ['Medellín', 'Bogotá', 'Cali', 'Cartagena', 'Barranquilla', 'Santa Marta', 'Bucaramanga', 'Pereira', 'Manizales', 'Cúcuta', 'Ibagué', 'Villavicencio', 'Pasto', 'Montería', 'Valledupar', 'Armenia', 'Popayán', 'Sincelejo', 'Neiva', 'Tunja', 'Riohacha', 'Quibdó'];
    
    // 1. Cities
    for (let i = 1; i <= 25; i++) {
        data.cities.push({
            id: uId('c', i),
            name: cityNames[i-1] || `Ciudad ${i}`,
            country: 'Colombia',
            lat: 4.0 + (Math.random() * 6),
            lng: -74.0 + (Math.random() * 2),
            status: 'active'
        });
    }

    // 2. Users & Roles
    const names = ['Juan', 'Maria', 'Carlos', 'Ana', 'Luis', 'Laura', 'Pedro', 'Sofia', 'Andres', 'Camila', 'Diego', 'Valentina', 'Mateo', 'Isabella', 'Sebastian', 'Valeria', 'Alejandro', 'Daniela', 'Felipe', 'Mariana', 'Daniel', 'Gabriela', 'David', 'Natalia', 'Camilo'];
    const lastNames = ['Perez', 'Gomez', 'Rodriguez', 'Lopez', 'Martinez', 'Garcia', 'Hernandez', 'Ramirez', 'Sanchez', 'Diaz', 'Torres', 'Ruiz', 'Alvarez', 'Molina', 'Castro', 'Ortiz', 'Gutierrez', 'Rubio', 'Reyes', 'Restrepo', 'Mejia', 'Jaramillo', 'Osorio', 'Cardona', 'Quintero'];

    for (let i = 1; i <= 30; i++) {
        const uIdStr = uId('u', i);
        data.users.push({
            id: uIdStr,
            name: `${names[i-1 % names.length]} ${lastNames[i-1 % lastNames.length]}`,
            username: `user_${i}`,
            email: `user${i}@example.com`,
            avatar_url: `https://i.pravatar.cc/150?u=${uIdStr}`,
            bio: `Amante de los eventos y la cultura urbana en ${cityNames[i%10]}.`,
            main_city_id: uId('c', rInt(1, 10)),
            created_at: isoDate(-rInt(10, 365)),
            status: 'active'
        });

        // Aseguramos que existan múltiples roles bien marcados
        data.user_roles.push({ id: uId('ur', data.user_roles.length + 1), user_id: uIdStr, role: 'user' });
        
        if (i % 3 === 0) { // Organizadores
            data.user_roles.push({ id: uId('ur', data.user_roles.length + 1), user_id: uIdStr, role: 'organizer' });
        }
        if (i % 4 === 0) { // Artistas
            data.user_roles.push({ id: uId('ur', data.user_roles.length + 1), user_id: uIdStr, role: 'artist' });
        }
        if (i === 1 || i === 2) { // Administradores
            data.user_roles.push({ id: uId('ur', data.user_roles.length + 1), user_id: uIdStr, role: 'admin' });
        }
    }

    // 3. Artist Profiles (Vinculado a usuarios con rol 'artist')
    let artistCount = 1;
    const genres = ['Rock', 'Pop', 'Reggaeton', 'Salsa', 'Vallenato', 'Jazz', 'Electrónica', 'Urbano', 'Indie', 'Folclórica'];
    data.user_roles.filter(ur => ur.role === 'artist').forEach(ur => {
        data.artist_profiles.push({
            id: uId('a', artistCount),
            user_id: ur.user_id,
            stage_name: `Artista Local ${artistCount}`,
            genre: rItem(genres),
            bio: `Llevando el ${rItem(genres)} a otro nivel y conectando con la ciudad.`,
            spotify_url: `https://spotify.com/artist/${artistCount}`,
            instagram_url: `https://instagram.com/artista${artistCount}`,
            followers_count: rInt(500, 150000),
            created_at: isoDate(-rInt(10, 100))
        });
        artistCount++;
    });
    // Añadir más para alcanzar 25 registros mínimos
    while(artistCount <= 25) {
        data.artist_profiles.push({
             id: uId('a', artistCount), user_id: uId('u', rInt(1,30)), stage_name: `Artista Invitado ${artistCount}`, genre: rItem(genres), bio: 'Música en vivo para todos.', spotify_url: '', instagram_url: '', followers_count: rInt(100, 50000), created_at: isoDate(-10)
        });
        artistCount++;
    }

    // 4. Business Profiles (Restaurantes vinculados a Organizadores)
    let bCount = 1;
    data.user_roles.filter(ur => ur.role === 'organizer').forEach(ur => {
        data.business_profiles.push({
            id: uId('b', bCount),
            user_id: ur.user_id,
            name: `Restaurante & Bar ${bCount}`,
            type: rItem(['Restaurante', 'Bar', 'Teatro', 'Discoteca', 'Café', 'Centro Cultural', 'Rooftop']),
            address: `Calle ${rInt(1,100)} #${rInt(1,100)}-${rInt(1,100)}`,
            city_id: uId('c', rInt(1, 10)),
            description: `El mejor ambiente de la ciudad, ven y prueba nuestra carta exclusiva.`,
            rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
            created_at: isoDate(-rInt(5, 200))
        });
        bCount++;
    });
    while(bCount <= 25) {
        data.business_profiles.push({
            id: uId('b', bCount), user_id: uId('u', rInt(1,30)), name: `Negocio Cultura ${bCount}`, type: 'Café', address: 'Dirección Central', city_id: uId('c', 1), description: 'Descubre nuestros sabores', rating: 4.5, created_at: isoDate(-5)
        });
        bCount++;
    }

    // 5. Menus & 6. Menu Items
    for (let i = 1; i <= 25; i++) {
        data.menus.push({
            id: uId('m', i),
            business_profile_id: uId('b', rInt(1, bCount-1)),
            name: `Menú Principal de Temporada ${i}`,
            is_active: true
        });
        
        for (let j = 1; j <= 4; j++) {
            data.menu_items.push({
                id: uId('mi', data.menu_items.length + 1),
                menu_id: uId('m', i),
                name: `Plato Exquisito ${j} (Restaurante ${i})`,
                description: `Delicioso platillo preparado con ingredientes locales e internacionales.`,
                price: rInt(15000, 100000),
                category: rItem(['Entrada', 'Plato Fuerte', 'Postre', 'Bebida', 'Cócteles']),
                image_url: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop&q=${i}${j}`
            });
        }
    }

    // 7. Events (Creados por organizadores y usuarios)
    const catEvents = ['Concierto', 'Teatro', 'Gastronomía', 'Deportes', 'Comedia', 'Arte', 'Networking', 'Taller', 'Fiesta', 'Festival', 'Tour', 'Cata de Vinos'];
    for (let i = 1; i <= 35; i++) {
        data.events.push({
            id: uId('e', i),
            title: `Evento Increíble: Edición ${i}`,
            description: `No te pierdas este magno evento. Una experiencia inmersiva para compartir, disfrutar de artistas, comida y cultura. Cupos limitados.`,
            city_id: uId('c', rInt(1, 15)),
            location: `Lugar del Evento ${i}, Centro de Convenciones`,
            lat: 4.0 + (Math.random() * 6),
            lng: -74.0 + (Math.random() * 2),
            organizer_id: uId('u', rInt(1, 30)),
            category: rItem(catEvents),
            start_date: isoDate(rInt(1, 30)), // Fechas futuras
            end_date: isoDate(rInt(31, 35)),
            price: rInt(0, 3) === 0 ? 0 : rInt(20000, 300000), // Algunos gratis
            capacity: rInt(30, 10000),
            image_url: `https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=500&fit=crop&q=${i}`,
            type: rInt(0, 10) === 0 ? 'private' : 'public',
            status: 'published'
        });
    }

    // 8. Event Artists
    for (let i = 1; i <= 30; i++) {
        data.event_artists.push({
            id: uId('ea', i),
            event_id: uId('e', rInt(1, 35)),
            artist_id: uId('a', rInt(1, 25))
        });
    }

    // 9. Tickets & 10. Event Attendees
    for (let i = 1; i <= 40; i++) {
        const tEvent = uId('e', rInt(1, 35));
        const tUser = uId('u', rInt(1, 30));
        const tType = rItem(['General', 'VIP', 'Meet & Greet', 'Early Bird']);
        
        data.tickets.push({
            id: uId('t', i),
            event_id: tEvent,
            user_id: tUser,
            ticket_type: tType,
            price: tType === 'VIP' ? rInt(100000, 300000) : rInt(20000, 90000),
            qr_code: `QR_VALID_CODE_${Math.random().toString(36).substring(7).toUpperCase()}`,
            status: 'valid',
            purchase_date: isoDate(-rInt(1, 15))
        });

        data.event_attendees.push({
            id: uId('att', i),
            event_id: tEvent,
            user_id: tUser,
            ticket_id: uId('t', i),
            status: rItem(['confirmed', 'checked_in']),
            created_at: isoDate(-rInt(1, 15))
        });
    }

    // 11. Payments Simulados
    for (let i = 1; i <= 30; i++) {
        const amt = rInt(50000, 1000000);
        data.payments.push({
            id: uId('p', i),
            user_id: uId('u', rInt(1, 30)), // Comprador
            organizer_id: uId('u', rInt(1, 30)), // Vendedor
            event_id: uId('e', rInt(1, 35)),
            amount: amt,
            app_fee: amt * 0.1, // 10% comisión app
            net_amount: amt * 0.9,
            currency: 'COP',
            status: 'completed',
            payment_method: rItem(['Credit Card', 'PSE', 'Apple Pay', 'Google Pay']),
            created_at:isoDate(-rInt(1, 20))
        });
    }

    // 12. Videos (CityFeed tipo TikTok)
    const videoTypes = ['event_promo', 'restaurant_promo', 'user_experience', 'artist_live', 'nightlife', 'tourist_plan'];
    for (let i = 1; i <= 35; i++) {
        data.videos.push({
            id: uId('v', i),
            creator_id: uId('u', rInt(1, 30)),
            city_id: uId('c', rInt(1, 15)),
            title: `Increíble experiencia en un lugar secreto ${i}`,
            description: `Miren este rooftop tan espectacular que descubrimos anoche! De locos totalmente 🔥 #ciudad #vibes #planes`,
            hashtags: ['#planes', '#ciudad', '#descubre', '#trend'].slice(0, rInt(2, 4)).join(' '),
            video_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnail_url: `https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=600&h=1000&fit=crop&q=${i}`,
            type: rItem(videoTypes),
            target_id: rInt(0,1) ? uId('e', rInt(1,35)) : uId('b', rInt(1,25)), // Lleva a Evento o Restaurante CTA
            target_type: rInt(0,1) ? 'event' : 'business',
            status: 'published',
            views_count: rInt(100, 500000),
            created_at: isoDate(-rInt(1, 30))
        });
    }

    // 13. Video Likes & 14. Comments
    for (let i = 1; i <= 40; i++) {
        data.video_likes.push({
            id: uId('vl', i),
            video_id: uId('v', rInt(1, 35)),
            user_id: uId('u', rInt(1, 30)),
            created_at: isoDate(-rInt(1, 10))
        });

        data.comments.push({
            id: uId('com', i),
            target_type: rItem(['video', 'event', 'business']),
            target_id: uId('v', rInt(1, 35)), 
            user_id: uId('u', rInt(1, 30)),
            text: `¡Qué gran parche! Yo quiero ir la próxima vez. Avisen. 🔥👏`,
            created_at: isoDate(-rInt(1, 10))
        });
    }

    // 15. Favorites & 16. Follows
    for (let i = 1; i <= 40; i++) {
        data.favorites.push({
            id: uId('fav', i),
            user_id: uId('u', rInt(1, 30)),
            target_type: rItem(['event', 'business', 'artist', 'video']),
            target_id: uId('e', rInt(1, 35)), 
            created_at: isoDate(-rInt(1, 30))
        });

        data.follows.push({
            id: uId('fol', i),
            follower_id: uId('u', rInt(1, 30)),
            following_id: uId('u', rInt(1, 30)), 
            created_at: isoDate(-rInt(1, 60))
        });
    }

    // 17. Reviews
    for (let i = 1; i <= 30; i++) {
        data.reviews.push({
            id: uId('rev', i),
            user_id: uId('u', rInt(1, 30)),
            target_type: rItem(['event', 'business']),
            target_id: uId('b', rInt(1, 25)), 
            rating: rInt(3, 5),
            comment: `Excelente lugar, muy recomendado. La atención fue de primer nivel.`,
            created_at: isoDate(-rInt(1, 50))
        });
    }

    // 18. Notifications
    for (let i = 1; i <= 35; i++) {
        data.notifications.push({
            id: uId('n', i),
            user_id: uId('u', rInt(1, 30)),
            type: rItem(['event_reminder', 'new_event_artist', 'nearby_event', 'trending_video', 'system']),
            title: `PlanCity Alerta ${i}`,
            message: `¡Tu evento está por comenzar! Revisa tu entrada.`,
            is_read: rInt(0, 1) === 1,
            created_at: isoDate(-rInt(0, 5))
        });
    }

    // 19. Event Views & 20. Video Views (Métricas para Dashboards de los organizadores/artistas)
    for (let i = 1; i <= 30; i++) {
        data.event_views.push({
            id: uId('ev', i),
            event_id: uId('e', rInt(1, 35)),
            user_id: uId('u', rInt(1, 30)),
            viewed_at: isoDate(-rInt(1, 5))
        });

        data.video_views.push({
            id: uId('vv', i),
            video_id: uId('v', rInt(1, 35)),
            user_id: uId('u', rInt(1, 30)),
            viewed_at: isoDate(-rInt(1, 5)),
            watch_time_seconds: rInt(5, 60)
        });
    }

    // 21. Reports (Moderación de los Administradores)
    for (let i = 1; i <= 25; i++) {
        data.reports.push({
            id: uId('rep', i),
            reporter_id: uId('u', rInt(1, 30)),
            target_type: rItem(['user', 'video', 'event', 'comment']),
            target_id: uId('v', rInt(1, 35)),
            reason: rItem(['Contenido inapropiado', 'Spam', 'Fraude/Estafa', 'Acoso']),
            status: rItem(['pending', 'resolved', 'dismissed']),
            created_at: isoDate(-rInt(1, 10))
        });
    }

    // 22. Tags
    const tagsArr = ['Música', 'Arte Urbano', 'Nocturno', 'Aesthetic', 'Rooftop', 'Deporte Extremo', 'Teatro', 'Standup', 'Citas Románticas', 'Amigos', 'Kpop', 'Techno', 'Salsa'];
    for (let i = 1; i <= 25; i++) {
        data.tags.push({
            id: uId('tag', i),
            name: tagsArr[i-1] || `Tag${i}`,
            usage_count: rInt(10, 50000)
        });
    }

    // 23. Promotions (Pautar publicidad de eventos)
    for (let i = 1; i <= 25; i++) {
        data.promotions.push({
            id: uId('pro', i),
            target_type: rItem(['event', 'video', 'business']),
            target_id: uId('e', rInt(1, 35)),
            organizer_id: uId('u', rInt(1, 30)),
            budget: rInt(50000, 2000000), // COP
            spent: rInt(10000, 49000),
            clicks: rInt(50, 5000),
            impressions: rInt(1000, 150000),
            start_date: isoDate(-rInt(1, 10)),
            end_date: isoDate(rInt(1, 15)),
            status: 'active'
        });
    }

    // 24. User Interests (Motor de Recomendación del CityFeed)
    for (let i = 1; i <= 30; i++) {
        data.user_interests.push({
            id: uId('ui', i),
            user_id: uId('u', rInt(1, 30)),
            tag_id: uId('tag', rInt(1, 20)),
            score: rInt(1, 100) // Nivel de afinidad del usuario con un interés
        });
    }

    return data;
}

const finalData = generateData();
fs.writeFileSync('plan_city_data.json', JSON.stringify(finalData, null, 2));

console.log('JSON data successfully created at plan_city_data.json');
