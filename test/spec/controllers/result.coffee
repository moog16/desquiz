'use strict'

describe 'Controller: ResultsCtrl', () ->
  # load the controller's module
  beforeEach module 'deskQuizApp'

  ResultsCtrl = {}
  scope = {}
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
      'correctAnswer' : '1',
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
                  "menu", 
                  "menuitem"
              ],
              'question' : '527009d9ed65b96fbf000006'
          }
      ],
      'sid' : 's:G5YRInlxcLH83beuCRDl+CkY.uEpBdIHmA6EL1C4UPBVjlCTSeCvgmlVq7xF4P70IwVY'

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope, $httpBackend) ->

    $httpBackend.when('GET', url + '/quiz').respond mockQuestions
    $httpBackend.when('GET', url + '/user').respond mockUser
    $httpBackend.when('GET', url + '/results').respond mockUser.quizResults
    $httpBackend.when('POST', url + '/results').respond mockUser._id


    scope = $rootScope.$new()
    ResultsCtrl = $controller 'ResultsCtrl', {
      $scope: scope
    }
    $httpBackend.flush()


  afterEach inject ($httpBackend) ->
     $httpBackend.verifyNoOutstandingExpectation()
     $httpBackend.verifyNoOutstandingRequest()

  it 'should initialze correct answers to 2', () ->
    expect(scope.correct).toBe 2

  it 'should calculate the score', () ->
    expect(scope.score).toBe '66.7'

  it 'should have results that returns an array', () ->
    expect(Array.isArray scope.results).toBe true

  it 'should calculate the correct results', () ->
    expect(scope.results[0].correct).toBe true

  it 'should calcuate an incorrect answer', () ->
    expect(scope.results[1].correct).toBe false

  it 'should calcuate a correct fillin answer', () ->
    expect(scope.results[2]['correct']).toBe true
