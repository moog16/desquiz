'use strict'

describe 'Controller: QuestionCtrl', () ->
  # load the controller's module
  beforeEach module 'deskQuizApp'

  QuestionCtrl = {}
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
      'quizResults' : [ {
              'answer' : 'fn.bind(this, stringsArray)',
              'question' : '527009d9ed65b96fbf000001'
          }, {
              'answer' : 2,
              'question' : '527009d9ed65b96fbf000002'
          }, {
              'answer' : 'Encapsulation',
              'question' : '527009d9ed65b96fbf000003'
          }, {
              'answer' : '<p>+<br>',
              'question' : '527009d9ed65b96fbf000004'
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

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope, $httpBackend) ->

    $httpBackend.when('GET', url + '/quiz').respond mockQuestions
    $httpBackend.when('GET', url + '/user').respond mockUser
    $httpBackend.when('POST', url + '/results').respond mockUser.quizResults

    scope = $rootScope.$new()
    QuestionCtrl = $controller 'QuestionCtrl', {
      $scope: scope
    }
    $httpBackend.flush()

  afterEach inject ($httpBackend) ->
     $httpBackend.verifyNoOutstandingExpectation()
     $httpBackend.verifyNoOutstandingRequest()

  it 'should get quiz questions on load', () ->
    expect(scope.questions.length).toBe 3
  it 'should look at first question on load', () ->
    expect(scope.active).toBe 0

  describe 'scope.validAnswer', () ->
    it 'should validate an answer has been selected if radio button has been checked', () ->
      answer = 'this would be an answer'
      scope.checkRadio answer
      expect(scope.validAnswer).toBe true
    it 'should save the answer selected if radio has been checked', () ->
      answer1 = 'this would be a good answer'
      answer2 = 'this is answer2'
      scope.checkRadio answer1
      scope.checkRadio answer2
      expect(scope.answer).toBe answer2

  describe 'scope.submitAnswer', () ->
    answer1 = 'answer1'
    answer2 = 'answer2'

    it 'should submit an answer by pushing to results array', () ->
      scope.checkRadio answer1
      scope.submitAnswer()
      expect(scope.quizTaker.results.length).toBe 1
    it 'should submit multiple answers', () ->
      scope.checkRadio answer1
      scope.submitAnswer()
      setTimeout () -> # wait for http flush
        scope.checkRadio(answer2)
        scope.submitAnswer()
        expect(scope.quizTaker.results.length).toBe 2
      , 100
    it 'should switch valid answer to false', () ->
      scope.checkRadio answer1
      scope.submitAnswer()
      expect(scope.validAnswer).toBe false
    it 'should move to the next question', () ->
      scope.checkRadio answer1
      scope.submitAnswer()
      expect(scope.active).toBe 1

  describe 'scope.submitFillin', () ->
    it 'should set valid answer to false', () ->
      scope.submitFillin()
      expect(scope.validAnswer).toBe false
    it 'should move to the next question', () ->
      scope.submitFillin()
      expect(scope.active).toBe 1
    # it 'should send results if user reaches end of questions', inject ($httpBackend) ->
      # scope.submitFillin()
      # $httpBackend.expectPOST(url+'/results', mockUser.quizResults).respond 201, ''

  # describe 'scope.gotoResults', () ->
  #   it 'should change location', inject ($location) ->
  #     console.log $location
  #     $location.path('/new/path');
  #     scope.gotoResults()
  #     expect(location.path()).toBe('/results');

  describe 'scope.makeArray', () ->
    beforeEach () ->
      scope.questions = mockQuestions
      scope.active = 2
    it 'should not create an array if question type !== fillin', () ->
      scope.active = 0
      newArray = scope.makeArray '5'
      expect(Array.isArray newArray).toBe false
    it 'should create an array if question type fillin', () ->
      newArray = scope.makeArray '5'
      expect(Array.isArray newArray).toBe true
    it 'should be of length size, of type string', () ->
      size = '5'
      newArray = scope.makeArray '5'
      expect(newArray.length).toBe 5
    it 'should be an array of undefined values', () ->
      newArray = scope.makeArray '5'
      expect(newArray[0]).toBe undefined

  # describe ''
