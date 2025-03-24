import * as SQLite from 'expo-sqlite';
import { emailGlobal, setemail } from './GlobalMail';
import { passwordGlobal, setpassword } from './GlobalPassword';

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const dbPromise = SQLite.openDatabaseAsync('maindb');

const CreateTble = async () => {
    const db = await dbPromise;
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Users ( ID INTEGER PRIMARY KEY AUTOINCREMENT, EMail TEXT, Password TEXT);
        CREATE TABLE IF NOT EXISTS Genres ( ID INTEGER PRIMARY KEY AUTOINCREMENT, GenreName TEXT);
        CREATE TABLE IF NOT EXISTS UserGenres ( ID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER, GenreID INTEGER, FOREIGN KEY (UserID) REFERENCES Users(ID), FOREIGN KEY (GenreID) REFERENCES Genres(ID));
        CREATE TABLE IF NOT EXISTS Movies ( ID INTEGER PRIMARY KEY AUTOINCREMENT, Genres TEXT, Poster TEXT, MovieName TEXT, About TEXT);`);
    };

    const addUser = async (email, password) => {
        let statement;
        try {
            const db = await dbPromise;
            statement = await db.prepareAsync('INSERT INTO Users (EMail, Password) VALUES (?, ?);');
            await sleep(1000);
            const result = await statement.executeAsync([email, password]);
            await sleep(1000);
            console.log("kullanici ekleme statementi",statement);
            console.log(`Eklenen User ID: ${result.lastInsertRowId}`);
            setemail(email);
            setpassword(password);
        }
        catch(err){
            console.error("Kullanici ekleme hatasi:",err);
        }
        finally {
            await statement.finalizeAsync();
        }
    };
    
    const addGenre = async (genreName) => {
        const db = await dbPromise;
        const statement = await db.prepareAsync('INSERT INTO Genres (GenreName) VALUES (?);');
        await sleep(1000);
        try {
            let result = await statement.executeAsync([genreName]);
            console.log(`Eklenen Genre ID: ${result.lastInsertRowId}`);
        } finally {
            await statement.finalizeAsync();
        }
    };
    
    const addUserGenre = async (userId, genreId) => {
        const db = await dbPromise;
        const statement = await db.prepareAsync('INSERT INTO UserGenres (UserID, GenreID) VALUES (?, ?);');
        await sleep(1000);
        try {
            const result = await statement.executeAsync([userId, genreId]);
            await sleep(1000);
            console.log(`Eklenen UserGenre ID: ${result.lastInsertRowId}`);
            console.log(userId);
            console.log(genreId);
        } finally {
            await statement.finalizeAsync();
        }
    };
    
    const addMovie = async (genre, poster, movieName, about) => {
        try {
            const db = await dbPromise;
            const statement = await db.prepareAsync('INSERT INTO Movies (Genres, Poster, MovieName, About) VALUES (?, ?, ?, ?);');
            await sleep(2000);
            try {
                let result = await statement.executeAsync([genre, poster, movieName, about]);
                await sleep(2000);
                console.log(`Eklenen film ID: ${result.lastInsertRowId}`, poster);
            } finally {
                await statement.finalizeAsync();
            }
        } catch (error) {
            console.error("Film eklenirken hata:", error);
        }
    };
    
    
    const checkUsers = async (usermail, userpass) => {
        try {
            const db = await dbPromise;
            const statement = await db.prepareAsync(`SELECT * FROM Users WHERE EMail = ? AND Password = ?;`);
            await sleep(1000);

            let result;
            try {
                result = await statement.executeAsync([usermail, userpass]);
                const firstRow = await result.getFirstAsync();
                await sleep(1000);

                if (firstRow) {
                    console.log("Sorgu tamamdir:", firstRow);
                    setemail(usermail);
                    setpassword(userpass);
                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                console.error("Sorguda hata", err);
                return false;
            } finally {
                await statement.finalizeAsync();
            }
        } catch (err) {
            console.error("database acilirken hata", err);
            return false;
        }
    };
    
    const getMovies = async () => {
        try {
            const db = await dbPromise;
          const statement = await db.prepareAsync('SELECT * FROM Movies;');
          await sleep(1000);
          const result = await statement.executeAsync();
          await sleep(1000);
          const movies = await result.getAllAsync();
          await result.resetAsync();
          return movies;
        } catch (error) {
          console.error('Filmleri çekerken hata:', error);
          return [];
        }
      };

    const UpdatePosterUri = async (newuri, name) =>{
        let statement;
        let result;
        try{
            const db = await dbPromise;
            statement = await db.prepareAsync(`UPDATE Movies SET Poster = ? WHERE MovieName = ?;`);
            await sleep(1000);
            result = await statement.executeAsync([newuri, name]);
            await sleep(1000);
        }
        catch(err){
            console.error(err, "Update olmadi knki");
        }
        finally{
            if(statement){
            await statement.finalizeAsync();
        }
            console.log("basarili update", result);
        }

    }

    const UsersID = async (usermail, userpass) => {
        const db = await dbPromise;
        try {
            const statement = await db.prepareAsync(`SELECT ID FROM Users WHERE EMail = ? AND Password = ?;`);
            await sleep(1000);
            let result;
            try {
                result = await statement.executeAsync([usermail, userpass]);
                
                const firstRow = await result.getFirstAsync();
                console.log("Kullanici id alindi", firstRow);

                if (firstRow) {
                    return firstRow.ID;
                } else {
                    return null;
                }
            } catch (err) {
                console.error("Error", err);
                return false;
            } finally {
                await statement.finalizeAsync();
            }
        } catch (err) {
            console.error("database acilirken hata", err);
            return false;
        }
    };

    const getGenre = async () => {
        try {
          const db = await dbPromise;
          const statement = await db.prepareAsync('SELECT GenreName FROM Genres;');
          await sleep(1000);
          const result = await statement.executeAsync();
          const genres = await result.getAllAsync();
          await sleep(1000);
          await result.resetAsync();
          return genres;
        } catch (error) {
          console.error('Genreleri alirken hata:', error);
          return [];
        }
      };

      const getGenreByName = async (genre) => {
        try {
          const db = await dbPromise;
          const statement = await db.prepareAsync('SELECT ID FROM Genres WHERE GenreName = ?;');
          await sleep(1000);
          const result = await statement.executeAsync([genre]);
      
          const firstRow = await result.getFirstAsync();
          await sleep(1000);
          console.log(firstRow);
          if (firstRow) {
            return firstRow.ID;
        } else {
            return null;
        }
        } catch (error) {
          console.error('isme göre genre cekerken hata:', error);
          return null;
        }
      };

      const getUserGenre = async () => {
        try {
            const db = await dbPromise;
            const statement = await db.prepareAsync('SELECT * FROM UserGenres;');
            const result = await statement.executeAsync();
            const genres = await result.getAllAsync();
            console.log(genres); 
            
            return genres.map(row => ({
                ID: row.ID,
                UserID: row.UserID,
                GenreID: row.GenreID
            }));
        } catch (error) {
            console.error('Kullanicinin fav genresini cekerken hata:', error);
            return [];
        }
    };
    
    const closeDatabase = async () => {
        const db = await dbPromise;
        await db.closeAsync();
        console.log('Veritabanı bağlantısı başarıyla kapatıldı');
    };

    const GetGenreForList = async (id) =>{
        let statement;
        try{
            const db = await dbPromise;
            statement = await db.prepareAsync('SELECT * FROM UserGenres WHERE UserID = ?;');
            const result = await statement.executeAsync([id]);
            await sleep(1000);
            const IsAnyFav = await result.getFirstAsync();
            await sleep(1000);
            console.log("Calisti",IsAnyFav);

            if(IsAnyFav){
                return true;
            }
            else{ return false; }
        }
        catch(err){
            console.error("Hata var:",err);
            return false;
        }

        finally{
            if(statement){
            await statement.finalizeAsync();
           }
        }
    }

    const GetGenreForRand = async (id) =>{
        let statement;
        try{
            const db = await dbPromise;
            statement = await db.prepareAsync('SELECT GenreID FROM UserGenres WHERE UserID = ?;');
            const result = await statement.executeAsync([id]);
            const IsAnyFav = await result.getAllAsync();
            console.log("Calisti",IsAnyFav);

            if(IsAnyFav){

                return IsAnyFav.map(item => item.GenreID);

        }
        }
        catch(err){
            console.error("Hata var:",err);
            return null;
        }

        finally{
            if(statement){
            await statement.finalizeAsync();
           }
        }
    }

    const getGenreById = async (genreid) => {
        try {
          const db = await dbPromise;
          const statement = await db.prepareAsync('SELECT GenreName FROM Genres WHERE ID = ?;');
          const result = await statement.executeAsync([genreid]);
      
          const firstRow = await result.getFirstAsync();
          console.log(firstRow);
          if (firstRow) {
            return firstRow.GenreName;
        } else {
            return null;
        }
        } catch (error) {
          console.error('id ye göre genre cekerken hata:', error);
          return null;
        }
      };

      const getMoviesRandom = async (Name) => {
        try {
          const db = await dbPromise;
          const statement = await db.prepareAsync('SELECT * FROM Movies WHERE Genres = ?;');
          const result = await statement.executeAsync([Name]);
      
          const movies = await result.getAllAsync();
          console.log(movies.value, movies.intValue, movies);
          await result.resetAsync();
          return movies;
        } catch (error) {
          console.error('Rastgele film icin basarisiz sorgu:', error);
          return [];
        }
      };
    
export default {
    CreateTble,
    addUser,
    addGenre,
    addUserGenre,
    addMovie,
    checkUsers,
    getMovies,
    UpdatePosterUri,
    getGenre,
    UsersID,
    getGenreByName,
    getUserGenre,
    GetGenreForList,
    GetGenreForRand,
    getGenreById,
    getMoviesRandom
}