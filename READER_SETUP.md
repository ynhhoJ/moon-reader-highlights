1. Open Moon+ Reader and select any book from your bookshelf
2. Press on three dots icon for settings
![First](./images/1.png)
3. In dialog menu enable checkbox for **Bookmarks** and click **OK**
![Second](./images/2.png)
4. In bottom menu should appear a new icon which allow you to control bookmarks
![Third](./images/3.png)
5. On left-side menu click on **Settings** icon
![Four](./images/4.png)
6. Enable `Share new highlights and notes to Readwise automatically` and click on right icon from option
![Five](./images/5.png)
7. Those fields are used to connect **Moon+ Reader** to [Readwise.io](https://readwise.io/) API, but we will use our, custom endpoint.

![Six](./images/6.png)

Fill `Token` field with any symbol or text. **It shouldn't be empty.**

In `Url` insert your endpoint IP
![Seven](./images/7.png)
8. Press **OK**

9. If everything is good you should see in console and your database **Moon+ Reader** test values.
![Eight](./images/8.png)

Everytime when you highlight something it automatically requests **API** and save highlighted note in **SQLite database**.