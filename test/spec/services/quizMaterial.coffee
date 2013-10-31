'use strict'

describe 'Service: quizMaterial', () ->
  # load the controller's module
  beforeEach module 'deskQuizApp'

  service = null
  quizMaterial = {}
  url = 'http://localhost:9000'
  mockQuestions = [
    {
      'type' : 'multi',
      'question' : 'To pass an array of strings to a function, you should not use...',
      'correctAnswer' : '2',
      '_id' : '527009d9ed65b96fbf000001',
      'answers' : [ 
        'fn.apply(this, stringsArray)', 
        'fn.call(this, stringsArray)', 
        'fn.bind(this, stringsArray)'
      ],
      '__v' : 0
    },
    {
      'type' : 'multi',
      'question' : 'Given <div id=”outer”><div class=”inner”></div></div>, which of these two is the most performant way to select the inner div?',
      'correctAnswer' : '0',
      '_id' : '527009d9ed65b96fbf000005',
      'answers' : [ 
        'getElementById("outer").children[0]', 
        'getElementsByClassName("inner")[0]'
      ],
      '__v' : 0
    },
    {
        'type' : 'fillin',
        'question' : '____ and ____ would be the HTML tags you would use to display a menu item and its description.',
        'correctAnswer' : '["menu", "menuitem"]',
        '_id' : '527009d9ed65b96fbf000006',
        'answers' : [ 
            2
        ],
        '__v' : 0
    }
  ]

  mockUser = 
      '__v' : 1,
      '_id' : '52713fd302ad57a3ec000001',
      'email' : 'matt',
      'password' : 'matt',
      'quizResults' : [ 
          {
            'answer' : 'fn.bind(this, stringsArray)',
            'question' : '527009d9ed65b96fbf000001'
          }, {
            'answer' : 'getElementById("outer").children[0]',
            'question' : '527009d9ed65b96fbf000005'
          }, {
              'answer' : [ 
                  'mean', 
                  'multi'
              ],
              'question' : '527009d9ed65b96fbf000006'
          }
      ],
      'sid' : 's:G5YRInlxcLH83beuCRDl+CkY.uEpBdIHmA6EL1C4UPBVjlCTSeCvgmlVq7xF4P70IwVY'

  describe 'getQuestions', () ->
    beforeEach inject ($httpBackend, $injector) ->
      quiz = $injector.get('quizMaterial')

      spyOn(quiz, 'getQuestions')
       .andCallThrough()

      quiz.getQuestions().then

      $httpBackend.when('GET', url + '/quiz').respond mockQuestions
      $httpBackend.when('GET', url + '/user').respond mockUser
      $httpBackend.when('GET', url + '/results').respond mockUser.quizResults
      $httpBackend.when('POST', url + '/results').respond mockUser._id

      $httpBackend.flush()

    afterEach inject ($httpBackend) ->
       $httpBackend.verifyNoOutstandingExpectation()
       $httpBackend.verifyNoOutstandingRequest()

    14 googleApi.gapi().then(function(keys) {
  15 reso
    # it 'should have function, postAnswers', () ->
      # service.postAnswers()
      # expect(angular.isFunction service.postAnswers).toBe true
