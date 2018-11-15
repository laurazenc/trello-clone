[![Build Status](https://travis-ci.com/laurazenc/trello-clone.svg?branch=master)](https://travis-ci.com/laurazenc/trello-clone)


# trello-clone

## Technologies

- **Backend**
  - Graphql
  - Mongodb
  - Passport (Google)
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
    - name
    - photo
    - boards: [Board]
    - teams: [Team]

**TEAM**

    - name
    - boards: [Board]

**BOARD**:

    - teamId
    - name

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
- [ ] Confirm account and forgot password emails
- [ ] Github login (Only server for now)
- [ ] Route permissions

...
