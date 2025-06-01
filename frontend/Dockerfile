# Gunakan image Node.js versi 20
FROM node:20

# Set working directory di dalam container
WORKDIR /app

# Salin semua isi folder frontend ke dalam container
COPY . .

# Install semua dependencies
RUN npm install

# Jalankan server dev Vite dengan host 0.0.0.0 (agar bisa diakses dari luar container)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
