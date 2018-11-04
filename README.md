# idea-board

Idea board app where you can create, update, delete and sort items.

## Demo can be seen at [surge.sh](http://ideaboard.samfed.surge.sh) and [netlify](https://pedantic-lalande-bcfadd.netlify.com/)

### Logic

1. when there are no ideas - sort buttons (in the top-right header) are hidden, only the "Create a New Idea button" is visible
1. In the pop-up user can,

    1. give "Title" to the idea (not mandatory)
    1. give description to the idea
    1. choose priority oneOf ["default", "primary", "secondary"]
    1. choose category oneOf ["sports", "fashion", "studies", "Uncategorized"]
    1. select status oneOf ["todo", "in progress", "completed"]
       **priorities, categories and status are configurable** at (idea-board\src\widget\Config.js)

1. **Ideas can be sorted based on the "Priorities" or "Categories"**

    1. if the user does not select any of these while creating an idea, **default values default/Uncategorized are attached respectively to the idea.**

On the dashboard (where all the ideas are mounted), each idea is shown on the card.

1. the **background-color of each card is based on the "PRIORITY" of the idea**.
    1. these colors are not configurable now, but can be made.
1. **all the ideas are sorted by "Category" by default**.
1. each individual idea can be updated or deleted.

    1. updated idea will take the place of the existing idea. It will not repeat. This can also be kept configurable.
    1. when the user clicks the update button, pop-up opens **with existing values already filled**.

1. the header section contains the buttons to sort the ideas "sort by category" and "sort by priority"
    1. ideas are sorted by category by default
    1. **all the ideas of same sort type are grouped together to show on UI.**
    1. For example, when user sorts by priority, all the ideas of same priority are grouped together and the priority becomes the heading of the group.
