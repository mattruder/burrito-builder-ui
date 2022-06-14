describe('Burrito Builder App', () => {
  beforeEach(() => {
   cy.visit('http://localhost:3000')
   cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
     statusCode: 200,
     body: {
       orders: [
          {
            id: 1,
            name: "Pat",
            ingredients: [
            "beans",
            "lettuce",
            "carnitas",
            "queso fresco",
            "jalapeno"
            ]
          },
          {
            id: 2,
            name: "Sam",
            ingredients: [
            "steak",
            "pico de gallo",
            "lettuce",
            "carnitas",
            "queso fresco",
            "jalapeno"
            ]
          },
          {
            id: 3,
            name: "Alex",
            ingredients: [
            "sofritas",
            "beans",
            "sour cream",
            "carnitas",
            "queso fresco"
            ]
          }
]
     }
   })
 })

 it('A user should see a homepage with a title', () => {
   cy.get('.App').contains("Burrito Builder")
 })

 it('A user should see an order form at the homepage', () => {
   cy.get('.order-form').contains('beans')
 })

 it('A user should see all current orders at the homepage', () => {
   cy.get('.all-orders').contains('Pat')
   cy.get('.all-orders').contains('Sam')
   cy.get('.all-orders').contains('Alex')
   cy.get('.all-orders').contains('beans')
   cy.get('.all-orders').contains('pico de gallo')
 })

 it('A user should be able to submit an order and see it reflected on the page', () => {
   cy.get('.name-input').type('Benjamin')
   cy.get('.beans').click()
   cy.get('.steak').click()
   cy.get('.submit-btn').click()
   // cy.get('.all-orders').contains('Benjamin')
 })

})
