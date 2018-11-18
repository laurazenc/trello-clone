[![Build Status](https://travis-ci.com/laurazenc/trello-clone.svg?branch=master)](https://travis-ci.com/laurazenc/trello-clone)

# trello-clone

## Technologies

- **Backend**
  - Graphql
  - Mongodb
  - Passport (Github)
- **Frontend**
  - Apollo
  - Storybook
  -

## Relationships

**BOARD** belongs to a **TEAM** which is form by **USERS**

**BOARD** has **LISTS** which contains **CARDS** made by **USERS**

**USER**:

    - email
    - password
    - displayName
    - photo
    - boards: [Board]
    - teams: [Team]

**TEAM**

    - name
    - boards: [Board]

**BOARD**:

    - teamId
    - name
    - lists: [List]

**LISTS**:

    - name
    - boardId
    - cards [Card]

**CARDS**:

    - name
    - description
    - attachements
    - userId
    - tags
    - listId

# ROADMAP

- [x] User auth (Server & Client)
- [x] Confirm account and forgot password emails
- [ ] Github login (Only server for now)
- [x] Route permissions
- [x] Users boards (Empty state, Get boards and create new boards)
- [x] Board details
- [x] Add lists to board
- [ ] Edit lists
- [ ] Add cards to lists
      ...

# SCREEN FLOW

![Screen flow](https://github.com/laurazenc/trello-clone/raw/master/images/auth_flow.png)
![Screen flow](https://github.com/laurazenc/trello-clone/raw/master/images/boards.png)
![Screen flow](https://github.com/laurazenc/trello-clone/raw/master/images/board_details.png)
